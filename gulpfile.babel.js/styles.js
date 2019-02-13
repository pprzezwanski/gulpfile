
import { src, dest } from 'gulp';
import size from 'gulp-size';
import gulpif from 'gulp-if';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import { config } from './config';

// for sass
sass.compiler = require('node-sass');

// sass
export const styles = () => src(config.paths.sass.in)
    .pipe(gulpif(config.devMode, sourcemaps.init()))
    .pipe(sass((config.sass)).on('error', sass.logError))
    // .pipe(src(config.paths.sass.vendor))
    // .pipe(src(concate('styles.css')))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'css before:' })))
    .pipe(postcss([
        autoprefixer({ browsers: ['last 1 version'] }),
        config.optimizeDev || !config.devMode ? require('cssnano-util-raw-cache')() : false,
        // cssnano()
    ].filter(Boolean)))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'css after:' })))
    .pipe(gulpif(config.devMode, sourcemaps.write('.')))
    .pipe(dest(config.paths.sass.out));
