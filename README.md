# gulp4file

This is modern gulp4 + webpack4 or broserify as buildtools configuration.

* "no 'ctr + c' workflow" (even for gulpfile changes), 
* es6 syntax including import/export for modules
* usefull configuration utilities, like choosing between 
* broserify, webpack and concatenation as build tool
* source maps for css and js for every optional build tool
* css and js linters
* support for jquery (if needed)

Please look at the beginning of config object in gulpfile.js to see some options

Commands:

* 'gulp': initial build and live preview with hmr/watch functionality.

* 'gulp info': to see the choosen config options (run it as parallel in another temrinal) 

* 'gulp refresh': if for some reason (but there should not be any, including images, fonts, incons and git operations) you want to clean dist folder and build it again, don't terminate gulp watch. Just open another terminal and make 'gulp refresh' - it will clean dist and reports folders, rebuild project and terminate itself while still running 'gulp' process will take care for further 'watching'

* 'js lint': if you want to check js with linter

* 'yarn prod' or NODE_ENV=production gulp refresh': build for production - fully minified, no sourcemaps, gulp will log file size before and after minification


Features:

* gulp4 with webpack4 or broserify as js bundler and all plugins - everything up to date in january 2019

* Working sourcemaps for js (in webpack, browserify and concatenation variants) as well as for sass.

* Ability to choose between webpack bundling and concatenation that does not require app.js file

* No 'ctr + c' at all! Gulp watch will never break or require relaunching (no gulp break because of js errors, no need to relaunch gulp after changes in icons, adding new icons or images or deleting old ones)

* We can do as many sprites as we want. The main sprite collects svg files from icons folder but if we put in that folder one or more subfolders they will be rendered into the next sprite files with names: ‘sprite-’ + folder name

* Ability to check sizes before and after minification (for html, css, js, images)

* Style lint which is logging results to a file (or loggin to console if changed in config object) while not breaking the watching process

* Separate task for eslint that will check every file in the bundle (we can also add some auto corrections or even eslint restrictions)

* Default task is not opening the live-preview in a new tab all the time forcing us to constantly close it to have only one tab with project

* Ability to choose browser refresh type between hot module replacement behaviour and standard watch that needs manual browser refresh (sometimes it is better for comparing ‘before and after’ in two browsers tabs)

* Ability to choose if initializing gulp opens the browser autmatically or not

* Information about chosen config highlights is logged to console when tasks starts 
