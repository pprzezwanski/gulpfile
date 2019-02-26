
import { src } from 'gulp';

import plumber from 'gulp-plumber';
import unusedImages from 'gulp-unused-images';
import { config } from './config';

// check unused images
export const checkUnusedImages = () => src(['./src/images/**/*', 'dist/**/*.html'])
    .pipe(plumber())
    .pipe(unusedImages())
    .pipe(plumber.stop());
