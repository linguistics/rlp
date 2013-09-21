## Instructions

**Design modifications**

1. Open [`map.sketch`](map.sketch) in [Sketch 2](http://www.bohemiancoding.com/sketch/)
2. Make your changes
3. Save (optional)
4. Export to [`map.svg`](map.svg) with "Trim transparent pixels" checked, including all layers.

**Workstation modifications**

1. Open [`students.csv`](students.csv) in a unicode-friendly editor.
2. Make your changes
3. Save with `utf-8` encoding. You can ensure that it was saved correctly by the case by running `file students.csv` at the command line, which should return:

> students.csv: UTF-8 Unicode text

**Rendering and Printing**

1. Commit and push all changes made above:

```sh
git commit -a -m "Updated with new students"  # (for example)
git push
```

2. Open [linguistics.github.io/cla/map.html](http://linguistics.github.io/cla/map.html) in [Chrome](https://www.google.com/chrome/).
3. Print to PDF or a physical destination.
    * By default, Chrome should use a landscape layout and minimal margins.
