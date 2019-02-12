/**
 * Gulp with:
 * - "no 'ctr + c' workflow", 
 * -  es6 syntax including import/export for modules
 * -  usefull configuration utilities, like choosing between 
 *    broserify, webpack and concatenation as build tool
 * -  source maps for html, css and js for every optional build tool
 * -  css and js linters
 * -  support for jquery (if needed)
 * 
 * Please look at the beginning of config object to see some options
 * 
 * Commands:
 * 
 * 'gulp': initial build and live preview with hmr/watch functionality. 
 * 
 * 'gulp refresh': if for some reason (but there should not be any 
 * including images, fonts, incons and git operations)
 * you want to clean dist folder and build it again, 
 * don't terminate gulp watch. Just open another terminal 
 * and make 'gulp refresh' - it will clean dist and reports folders,
 * rebuild project and terminate itself while still running 'gulp' process 
 * will take care for further watching
 * 
 * 'gulp info': to see the choosen config options (run it as parallel in another temrinal) 
 * 
 * 'js lint': if you want to check js with linter
 * 
 * 'yarn prod' or NODE_ENV=production gulp refresh': build for production - fully minified, 
 * no sourcemaps, gulp will log file size before and after minification
 */

import { parallel, watch, series } from 'gulp';
   
// gulp modules imports
import { config } from './config';
import { stylelint } from './stylelint';
import { jslint } from './jslint';
import { build } from './build';
import { watchFiles } from './watch';
import { exit } from './exit';
import { clean } from './clean';
import { purgeCss } from './purgeCss';
import { unusedCss } from './checkCss';
import { preview } from './browserSync';

// log config highlights at the beginning of a task
console.log(
    // pkg.name + ' ' + pkg.version + '\n'
    'mode: ' + config.mode + '\n'
    + 'js bundling: ' + (
        config.noBuildTool 
            ? 'concatenation without build tool' 
            : config.webpacked ? 'webpack' : 'browserify'
        ) + '\n'
    + 'browser refresh type: ' + (config.hotReload ? 'hot module replacement': 'watch') + '\n'
    + 'preview auto-open: ' + (config.autoOpen ? 'yes': 'no') + '\n'
    + 'stylelint mode: ' + (config.aggressiveStyleLint ? 'aggressive' : 'hints are available in ./reports/lint') + '\n'
    + '"gulp info" in another terminal to log this summary' + '\n'
    + '"gulp refresh" in another terminal to clean folders and rebuild while watching'
);

const live = parallel(preview, watchFiles);

// automatically terminate gulp when a change in gulpfile is saved
// watch('./gulpfile.js', series(exit))
watch('./gulpfile.babel.js', series(exit));

// public tasks
export default series(build, live);
export const refresh = series(clean(), build, exit);
export const jslinter = jslint;
exports.jslint = jslint;
exports.info = exit;
exports.build = refresh;
exports.live = live;
exports.preview = preview;
exports.stylelint = stylelint;
exports.purgeCss = purgeCss;
exports.unusedCss = unusedCss;