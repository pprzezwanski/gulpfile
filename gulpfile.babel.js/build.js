import { parallel, series } from 'gulp';

// gulp modules imports
import { images } from './images';
import { fonts } from './fonts';
import { sprites } from './sprites';
import { html } from './html';
import { styles } from './styles';
import { scripts } from './scripts';
import { stylelintCheck } from './stylelintCheck';
import { jslint } from './jslint';
import { purgeCss } from './purgeCss';
import { config } from './config';

// set main build task
export const build = parallel(
    fonts,
    images,
    sprites,
    series(parallel(html, styles), !config.devMode ? purgeCss : (done) => { done() }),
    stylelintCheck,
    jslint,
    scripts,
);