# gulp4 boilerplate

[Main]()

### Install packages
```
yarn
```

### Run project
```
gulp

* Please take a look at the beginning of config object in gulpfile.babel.js/config.js to see some useful options

yarn gulp: the same as 'gulp' but the Gulp will restart automatically on any saved gulpfile.js change

gulp info: to see the choosen config options (run it as parallel in another terminal) 

gulp refresh: if for some reason (but there should not be any, including images, fonts, icons and git operations) you want to clean dist folder and build it again, don't terminate 'gulp' process. Just open another terminal and make 'gulp refresh' - it will clean dist and reports folders, rebuild project and terminate itself while still running 'gulp' process will take care for further 'watching'

'gulp jslint': if you want to check js with linter
```

### Build project
```
yarn build
```

### Syntax

es6 including import/export modules for both webpack and browserify option


### gulp approach sum-up

No 'ctr + c' workflow. No need to restart gulp any images, fonts, icons operations (or even gulpfile changes when 'yarn gulp' command).
Rarely there is a need to 'gulp refresh' after git merging with conflicts
