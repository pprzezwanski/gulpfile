# gulp4file

This is working modern gulp4 + webpack4 configuration file.

Features:

* Up to date gulp4, webpack4 and all plugins (january 2019)

* Ability to choose between webpack bundling and concatenation that does not require app.js file

* No need to relaunch gulp after changes in icons, adding new icons or deleting old ones

* We can do as many sprites as we want. The main sprite collects svg files from icons folder but if we put in that folder one or more subfolders they will be rendered into the next sprite files with names: ‘sprite-’ + folder name

* Working sourcemaps for js (both webpack and concatenation) and for sass

* No gulp breaks because of js errors

* Ability to check sizes before and after minification (for html, css, js, images)

* Style lint which is logging results to a file while not breaking the watching process

* Separate task for eslint check for every file in the bundle (we can also add some auto corrections or even eslint restrictions)

* Default task is not opening the live-preview in a new tab all the time forcing us to constantly close it to have only one tab with project

* Ability to choose browser refresh type between hot module replacement behaviour and standard watch that needs manual browser refresh (sometimes it is better for comparing ‘before and after’ in two browsers tabs)

* Information about chosen config principals is logged to console when tasks starts 

* Separate 'gulp clean' task
