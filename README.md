## Instructions

**Design modifications**

1. Open [`map.sketch`](map.sketch) in [Sketch 2](http://www.bohemiancoding.com/sketch/)
2. Make your changes
3. Save (optional)
4. Export to [`map.svg`](map.svg) with "Trim transparent pixels" checked, including all layers.

**Workstation modifications**

1. Open [`people.tsv`](people.tsv) in a unicode-friendly editor.
2. Make your changes
3. Save with `utf-8` encoding. You can ensure that it was saved correctly by running `file people.tsv` at the command line, which should return:

> people.tsv: UTF-8 Unicode text

**Rendering and Printing**

1. Commit and push all changes made above:

```sh
git commit -a -m "Updated with new students"  # (for example)
git push
```

2. Open [linguistics.github.io/cla/map.html](http://linguistics.github.io/cla/map.html) in [Chrome](https://www.google.com/chrome/).
3. Print to PDF or a physical destination.
    * By default, Chrome should use a landscape layout and minimal margins.


## Workstation Allotment Policy

1. Three or four weeks before the beginning of semester:
    * Call the set of current workstation residents (whether fellowship or not) `incumbents`
    * Ask administration for a list of all fellowship recipients, TAs, and AIs (and maybe GRAs); call this set `privileged`
    * Let `itinerants = incumbents - privileged` (students who may need to move out)
    * Let `residents = incumbents ∩ privileged` (these guys aren't going to move, and their workstations will not go up for grabs)
    * Let `incoming = privileged - incumbents` (students who will for sure get a workstation but we don't yet know where)
    * Let `homeless = privileged'` (the complement of `privileged`)
2. Send some emails:
    * Ask all of the `homeless` to apply for a workstation, if they want one.
    * There are currently 25 workstations total. Select the top `25 - |privileged|` applicants, and call these `winners`.
    * Call the remainder of the applicants `rejections`, and inform them that they didn't make the cut.
    * Add `winners ∩ itinerants` to the `residents`, and let `evictions = itinerants - winners` (which may overlap with the `rejections`)
    * Ask the `incoming` which workstations they would like, from among the `evictions` (assuming that all workstations are currently occupied; if that's not the case, add the abandoned workstations to the `evictions` set)
    * If there are any `winners - itinerants`, let them choose among the workstations `evictions - incoming`
3. If possible, go back in time a couple months and send some more emails:
    * Inform `evictions` that they may need to vacate their workstations, especially if they are going to be gone for the summer.

See the examples in the [emails](emails/) directory for templates for these notifications.

### Prioritization

As available, workstations will be assigned to the following groups of students / physical objects:

1. Fellowship recipients
2. Assistant Instructors
3. Teaching Assistants
4. Graduate Research Assistants
5. Best applicants
6. Worst applicants
7. Lingerers-on
8. Groupies
9. Pets
10. Prized possessions


#### Applications

The only prioritization step that's hard (requires some actual decision-making) is #5.
Generally, preference will be given to students who:

1. Would use their workstation a lot
2. Are near the end of their degree program
3. Have good workstation prank ideas


E.g., **Fall 2013 workstation application** form had these fields:

* Full name
* Email address
    - Drop-down list of emails, to aid identification of student
* Need: On a scale of 1 to 10, how much do you want a workstation?
    - Radio buttons from 1 to 10
* Alternatives: Do you already have a desk or assigned workspace elsewhere?
    - [ ] No
    - [ ] CILLA
    - [ ] Signed Languages Lab
    - [ ] Language Acquisition Lab
    - [ ] Phonetics Lab
    - [ ] German department
    - [ ] Spanish department
    - [ ] Other: `______________`
* Time: How often do you think you would use your workstation?
    - [ ] < 1 day a week
    - [ ] 1 day a week
    - [ ] 2 days a week
    - [ ] 3 days a week
    - [ ] 4 days a week
    - [ ] 5+ days a week
* Cardinality: Which side would prefer?
    - [ ] West
    - [ ] East
* Rhetoric: Any parting remarks?
