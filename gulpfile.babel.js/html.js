import { config } from './config';

import { src, dest, parallel, watch, series } from 'gulp';
import size from 'gulp-size';
import gulpif from 'gulp-if';

import htmlmin from 'gulp-htmlmin';
import pug from 'gulp-pug';

// pug
export const html = () => src(config.paths.pug.in)
    // .pipe(plumber())
    .pipe(pug())
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'HTML before:' })))
    .pipe(gulpif(config.optimizeDev || !config.devMode, htmlmin({ collapseWhitespace: true })))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'HTML after:' }))) 
	.pipe(dest(config.paths.pug.out));