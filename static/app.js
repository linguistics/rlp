/*jslint browser: true, devel: true */ /*globals _, angular */
function parseSV(text) {
  var lines = text.split('\n');
  var FS = (lines[0].split('\t').length > lines[0].split(',').length) ? '\t' : ',';
  var columns = lines[0].split(FS);
  return lines.slice(1).filter(function(line) {
    return line !== '';
  }).map(function(row) {
    var cells = row.split(FS);
    return _.object(columns, cells);
  });
}


var app = angular.module('app', [
  'ngStorage',
]);

// reusables:

app.filter('where', function() {
  // return function(list, properties) { return _.where(list, properties); };
  return _.where;
});

app.filter('encode', function() {
  return window.encodeURIComponent;
});

app.directive('separator', function() {
  // like ng-list, but bi-directional
  // http://docs.angularjs.org/api/ng.directive:ngList
  return {
    scope: {
      separator: '='
    },
    require: 'ngModel',
    link: function(scope, el, attrs, ngModel) {
      ngModel.$parsers.push(function(string) {
        // javascript doesn't so ''.split('x') correctly (should be [], is empty string)
        if (string === '') return [];
        return string.split(scope.separator);
      });
      ngModel.$formatters.push(function(array) {
        return (array || []).join(scope.separator);
      });
    }
  };
});

app.directive('contacts', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/contacts.html',
    scope: {
      contacts: '=ngModel',
      predicate: '=where',
      format: '=format'
    },
    replace: true
  };
});

// map controllers

app.controller('MapCtrl', function($scope) {
  $scope.print = window.location.hash == '#print';
});

app.directive('map', function($http, $q) {
  return {
    restrict: 'E',
    link: function(scope, el) {
      $q.all({
        svg: $http.get('map.svg'),
        tsv: $http.get('people.tsv')
      }).then(function(responses) {
        // res objects have these fields: config, data, headers, status
        var people = parseSV(responses.tsv.data);
        var svg = responses.svg.data.replace(/\{\{(.+?)\}\}/g, function(match, token) {
          var occupant = _.findWhere(people, {location: token});
          return occupant ? occupant.name : '';
        });

        el.html(svg).find('svg').css({width: '100%', height: '100%'});
      }, function(exc) {
        console.log('Could not load resources:', exc);
      });
    }
  };
});

// admin controllers

app.controller('AdminCtrl', function($scope, $http, $localStorage) {
  $scope.students = [];
  $scope.recompute = function() {
    $scope.privileged_missing = $scope.$storage.privileged.filter(function(name) {
      return _.findWhere($scope.students, {name: name}) === undefined;
    });

    $scope.winners_missing = $scope.$storage.winners.filter(function(name) {
      return _.findWhere($scope.students, {name: name}) === undefined;
    });

    $scope.students.forEach(function(s) {
      s.incumbent = s.workstation !== '';
      s.privileged = $scope.$storage.privileged.indexOf(s.name) != -1;
      // `itinerants = incumbents - privileged` (students who may need to move out)
      s.itinerant = s.incumbent && !s.privileged;
      // `residents = incumbents ∩ privileged`
      // (these guys aren't going to move, and their workstations will not go up for grabs)
      s.resident = s.incumbent && s.privileged;
      // `homeless = privileged'` (the complement of `privileged`)
      s.homeless = !s.privileged;
      s.winner = $scope.$storage.winners.indexOf(s.name) != -1;
      // `incoming = (privileged + winner) - incumbents`
      // (students who will for sure get a workstation but we don't yet know where)
      s.incoming = (s.privileged || s.winner) && !s.incumbent;
    });
  };
  $scope.$watch('students', $scope.recompute);
  $scope.$watch('$storage.privileged', $scope.recompute);
  $scope.$watch('$storage.winners', $scope.recompute);

  $http.get('people.tsv').then(function(res) {
    $scope.students = parseSV(res.data).filter(function(occupant) {
      return occupant.location && occupant.location.match(/^[AWE]\d+/);
    });
  }, function(err) {
    console.log('Encountered error:', err);
  });

  // init localStorage
  $scope.$storage = $localStorage.$default({
    studentFormat: 'name',
    privileged: [],
    winners: [],
    nworkstations: 28
  });

  var url = Url.parse(location);
  var changed = !!(url.query.privileged || url.query.winners);
  if (url.query.privileged) {
    $scope.$storage.privileged = url.query.privileged.split(/\n/);
    delete url.query.privileged;
  }
  if (url.query.winners) {
    $scope.$storage.winners = url.query.winners.split(/\n/);
    delete url.query.winners;
  }
  if (changed) {
    // setting window.location occurs before the localStorage flushes, so we can't do that.
    history.replaceState(null, '', url.toString());
  }
});
