# gulp4file

This is working modern gulp4 + webpack4 configuration file.

Features:

* Up to date gulp4, webpack4 and all plugins (january 2019)

* Working sourcemaps for js (both in webpack and concatenation variants) as well as for sass

* Ability to choose between webpack bundling and concatenation that does not require app.js file

* No 'ctr + c' at all! Gulp watch will never break or require relaunching (no gulp break because of js errors, no need to relaunch gulp after changes in icons, adding new icons or images or deleting old ones)

* We can do as many sprites as we want. The main sprite collects svg files from icons folder but if we put in that folder one or more subfolders they will be rendered into the next sprite files with names: ‘sprite-’ + folder name

* Ability to check sizes before and after minification (for html, css, js, images)

* Style lint which is logging results to a file (or loggin to console if changed in config object) while not breaking the watching process

* Separate task for eslint that will check every file in the bundle (we can also add some auto corrections or even eslint restrictions)

* Default task is not opening the live-preview in a new tab all the time forcing us to constantly close it to have only one tab with project

* Ability to choose browser refresh type between hot module replacement behaviour and standard watch that needs manual browser refresh (sometimes it is better for comparing ‘before and after’ in two browsers tabs)

* Information about chosen config highlights is logged to console when tasks starts 

* Separate 'gulp clean' task
