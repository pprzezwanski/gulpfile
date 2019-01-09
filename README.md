# gulp4file

This is working modern varibles-based gulp4 configuration file.

Features:

1. we don’t have declare modules in app.js or app.sass files 
2. no need to relaunch gulp after sprites change, adding new icons or deleting old ones
3. working sourcemaps for sass and js for faster debugging
4. no gulp breaks because of js error
5. default task is not opening the live-preview in a new tab all the time forcing us to constantly close it to have only one tab with project
6. we can do as many sprites as we want (before we could do only one). The main sprite collects svg files from icons folder but if we put in that folder one or more subfolders they will be rendered into the next sprite files with names: ‘sprite-’ + folder name
7. when we set environment variable to production and make gulp build we get information about how much space we have gained with minification
8. we have working sass style lint which is logging results to a file while not breaking the watching process
9. a separate task for eslint check for every file in the bundle (we can also add some auto corrections or even eslint restrictions)
10. ability to choose browser refresh type hot module replacement behaviour (which has been our default up to now) and standard watch process that needs manual browser refresh (sometimes it is better for comparing ‘before and after’ in two browser tabs)
