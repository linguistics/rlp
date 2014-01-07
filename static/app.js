// "use strict"; /*jslint indent: 2 */ /*globals _, angular */
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

// map controllers

var map_app = angular.module('mapApp', []);

map_app.controller('Ctrl', function($scope) {
  $scope.print = window.location.hash == '#print';
});

map_app.directive('map', function($http, $q) {
  return {
    restrict: 'E',
    link: function(scope, el, attrs) {
      $q.all({
        svg: $http.get('map.svg'),
        tsv: $http.get('students.tsv')
      }).then(function(responses) {
        // res objects have these fields: config, data, headers, status
        var students = parseSV(responses.tsv.data);
        var svg = responses.svg.data.replace(/\{\{(\w+)\}\}/g, function(match, token) {
          var occupying_student = _.findWhere(students, {workstation: token});
          return occupying_student ? occupying_student.name : '';
        });

        el.html(svg).find('svg').css({width: '100%', height: '100%'});
      }, function(exc) {
        console.log('Could not load resources:', exc);
      });
    }
  };
});

// admin controllers

var admin_app = angular.module('adminApp', ['ngStorage']);

admin_app.filter('where', function() {
  // return function(list, properties) { return _.where(list, properties); };
  return _.where;
});

admin_app.controller('Ctrl', function($scope, $http, $localStorage) {
  $scope.students = [];
  $scope.recompute = function() {
    $scope.missing = $scope.$storage.privileged.filter(function(name) {
      return _.findWhere($scope.students, {name: name}) === undefined;
    });

    $scope.students.forEach(function(s) {
      s.incumbent = s.workstation !== '';
      s.privileged = $scope.$storage.privileged.indexOf(s.name) != -1;
      // `itinerants = incumbents - privileged` (students who may need to move out)
      s.itinerant = s.incumbent && !s.privileged;
      // `residents = incumbents ∩ privileged` (these guys aren't going to move, and their workstations will not go up for grabs)
      s.resident = s.incumbent && s.privileged;
      // `incoming = privileged - incumbents` (students who will for sure get a workstation but we don't yet know where)
      s.incoming = s.privileged && !s.incumbent;
      // `homeless = privileged'` (the complement of `privileged`)
      s.homeless = !s.privileged;
    });
  };
  $scope.$watch('students', $scope.recompute);
  $scope.$watch('$storage.privileged', $scope.recompute);

  $http.get('students.tsv').then(function(res) {
    $scope.students = parseSV(res.data);
  }, function(err) {
    console.log('Encountered error:', err);
  });

  // init localStorage
  $scope.$storage = $localStorage.$default({
    studentFormat: 'name',
    privileged: []
  });
});

// like ng-link, but bi-directional
admin_app.directive('separator', function() {
  return {
    scope: {
      separator: '='
    },
    require: 'ngModel',
    link: function(scope, el, attrs, ngModel) {
      ngModel.$parsers.push(function(string) {
        // console.log("trying to parse", string);
        return string.split(scope.separator);
      });
      ngModel.$formatters.push(function(array) {
        return (array || []).join(scope.separator);
      });
    }
  };
});
