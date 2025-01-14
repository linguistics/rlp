## Instructions for Updating

#### What You Need

You will need to be familiar with GitHub.

You will need [Sketch](https://www.sketch.com/) for Mac.  As an eductional user, you can get a free license by starting a free trial and then filling in their form to explain why you need Sketch for your work in academia.

Finally, you will also need Microsoft Excel, which UT [provides](https://microsoft365.utexas.edu/students-and-microsoft-365) to all students.

#### Fork and clone this repository

In order to have access to all files in this repository, fork it to your own GitHub account, then clone your fork onto your local computer.

#### Update the list of people

Open people.xlsx in Microsoft Excel.  Delete/add/update any rows as necessary.  Only modify columns A, B, and C; column D will automatically generate.  (If you add to the bottom of the list, just hover over the bottom-right corner of the last filled cell in column D and drag down to fill in the formula.)  Click into cell A1, press cmd+A to select the whole island of data, and sort by last name.  Save but do not close.

#### Update the graphic file

1. Open the .sketch file in Sketch.
2. Open a blank text file.  Select just the filled cells in column D from the Excel file and copy to your clipboard.  Paste into the blank text file.  Use cmd+A to select all contents of this text file and then cmd+C to copy to your clipboard.
3. Inside Sketch, double click the first block of names/workstations so that it is editable.  Use cmd+A to select everything, then cmd+V to overwrite with the new list.  You will need to select subsets of the next text block and use these to overwrite the contents of the other two until you are satisfied with the presentation.
4. Save down your changes to the Sketch file by using "Save to your Mac."  Replace the .sketch file in the repository folder on your local drive with this updated version.
5. Output the PDF version by going to File>Export>Artboards to PDF.  Name as "map.pdf" and replace the .pdf in the repository folder on your local drive with this updated version.
6. As a precautionary measure, export the .sketch file to .svg.  Select the artboard and Export to SVG in the bottom-right of the Sketch window.  Click "Export Selected" and save as map.svg.  Replace the .svg file in the repository folder on your local drive with this updated version.

#### Push your changes to your GitHub

Once all changes are complete, push to your forked GitHub repo.

#### PR to the ASOL repository

On the GitHub interface, initiate a pull request (PR) to merge your fork with this repository.  Although the Digital Resources representative from ASOL should receive a notification of your pull request, it is a good idea to reach out personally to let them know so that they can immediate complete the PR.  If you are not sure who is the Digital Resources representative is, check out the [ASOL website](https://asol.ling.utexas.edu/).
