# gulp4 boilerplate 

This is modern gulp4 boilerplate with `no 'ctr + c' workflow`, including:

* "no 'ctr + c' workflow" (even for operations on images, sprites, git, gulpfile)
* ability to choose webpack, browserify or concatenation as build tool
* es6 syntax including 'tree shakeable' import/export UMD modules for webpack and browserify
* support for non UMD globals (like jQuery)
* automatic unused css removal in production mode (be carefull about whitelist for classes added by js)
* usefull configuration utilities available in gulpfilejs/config.js 
* source maps for css and js for every optional build tool
* check final html for undefined classes (standalone task)
* check if there are any images unused in final html or css (standalone task)
* all dependecies up to date in january 2019 
* style and js linters: during development as hints (only for saved file to speed up browser refreshing) and for production as tests that have to be passed successfully to finish produciton build
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
fully minified, no sourcemaps, gulp will log file size before and after minification, unused css is purged, has to pass stylelint and eslint tests, and at the end automatically previews built project to quick check. 

### IMPORTANT
#### 'yarn build' will remove all unused classes from css so be sure to include in whitelist (gulpfile.babel.js/config.js in object: config.purgeCssWhiteList) all classes that are not present in html before javascript runs (classes in html rendered by js scripts)


## Other gulp commands

* 'gulp img': it will inform about images that are probably unusued in final html, css or js

* 'gulp live': preview and start watching the project without initial build

* 'gulp info': to see the choosen config options (run it as parallel in another temrinal) 

* 'gulp preview': only preview the project without watching and initial build

* 'gulp checkCss': check if in css there are classes that are not used in html and check html for undefined classes 




## Pages

[Main]()
