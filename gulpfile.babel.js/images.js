
import { config } from './config';

import { src, dest, parallel, watch, series } from 'gulp';

import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';

import size from 'gulp-size';
import gulpif from 'gulp-if';

// images
export const images = () => src(config.paths.images.in)
    .pipe(newer(config.paths.images.out))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'before imagemin:' })))
    .pipe(imagemin())
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'after imagemin:' })))
	.pipe(dest(config.paths.images.out));