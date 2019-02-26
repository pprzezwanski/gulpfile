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
import { checkUnusedImages } from './checkUnusedImages';

// log config highlights at the beginning of a task
console.log(
    // pkg.name + ' ' + pkg.version + '\n'
    `mode: ${  config.mode  }\n`
    + `js bundling: ${  
        config.noBuildTool 
            ? 'concatenation without build tool' 
            : config.webpacked ? 'webpack' : 'browserify'  }\n`
    + `browser refresh type: ${  config.hotReload ? 'hot module replacement': 'watch'  }\n`
    + `preview auto-open: ${  config.autoOpen ? 'yes': 'no'  }\n`
    + `"gulp refresh" in another terminal to clean folders and rebuild while watching\n`,
);

const live = parallel(preview, watchFiles);

// automatically terminate gulp when a change in gulpfile is saved
// watch('./gulpfile.js', series(exit))
watch('./gulpfile.babel.js', series(exit));

// public tasks
export default series(build, live);
export const refresh = series(clean(), build, config.devMode ? exit : preview);
export const jslinter = jslint;
exports.jslint = jslint;
exports.info = exit;
exports.build = refresh;
exports.live = live;
exports.preview = preview;
exports.stylelint = series(stylelint, exit);
exports.purgeCss = series(purgeCss, exit);
exports.checkCss = series(unusedCss, exit);
exports.img = series(checkUnusedImages, exit);
