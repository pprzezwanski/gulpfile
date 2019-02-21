# gulp4 boilerplate 

This is modern gulp4 boilerplate with `no 'ctr + c' workflow`, including:

* "no 'ctr + c' workflow" (even for operations on images, sprites, git, gulpfile)
* ability to choose webpack, browserify or concatenation as build tool
* es6 syntax including import/export for modules for webpack and browserify
* usefull configuration utilities available in gulpfilejs/config.js 
* source maps for css and js for every optional build tool
* clean unused css, chceck html for undefined classes
* all dependecies up to date in january 2019 
* support for jquery (if needed)
* style and js linters (stylelint is part of build task and logs results to ./reports folder but jslint is a standalone task)
* automatic multiple sprites generation (the main sprite collects svg files from icons folder but if we put in that folder one or more subfolders they will be rendered into the next sprite files with names: ‘sprite-’ + folder name)
* ability to check sizes before and after minification (for html, css, js, images)



## Install packages
```
yarn
```


## Run project

* Please take a look at the beginning of config object in gulpfile.babel.js/config.js to see some useful options

```
yarn start (or: npm start) - this will make gulp restarting automatically on any saved gulpfile.js change or termination
```

```
gulp - this will also work but without automatic relaunch of gulp
```

```
gulp refresh
```
if for some reason (but there should not be any, including images, fonts, icons and git operations) you want to clean dist folder and build it again, don't terminate 'gulp' process. Just open another terminal and make 'gulp refresh' - it will clean dist and reports folders, rebuild project and terminate itself while still running 'gulp' process will take care for further 'watching'


## Production build
```
yarn build (or: npm run build)
```
fully minified, no sourcemaps, gulp will log file size before and after minification

### IMPORTANT
#### 'yarn build' will remove all unused classes from css so be sure to include in whitelist (gulpfile.babel.js/config.js in object: config.purgeCssWhiteList) all classes that are not present in html before javascript runs (classes in html rendered by js scripts)


## Other gulp commands

* 'gulp info': to see the choosen config options (run it as parallel in another temrinal) 

* 'gulp preview': only preview the project without watching  and initial build

* 'gulp live': preview and start watching the project without initial build

* 'gulp jslint': check js with a linter

* 'gulp stylelint': check css with a linter

* 'gulp checkCss': check if in css there are classes that are not used in html and check html for undefined classes 

* 'gulp purgeCss': it will remove unusued classes from the files specified in the input


## Pages

[Main]()
