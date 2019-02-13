
import { src } from 'gulp';
import path from 'path';
import merge from 'merge-stream';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import { config } from './config';

import { getFolders } from './utils';

// lint scripts
export const jslint = (done) => {
    const bundleFolder = './src/js/bundle';
    const folders = getFolders(bundleFolder);
    if (folders.length === 0) return done();

    const root = src(path.join('./src/js/bundle', '/*.js'))// .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulpif((!config.devMode), eslint.failAfterError()));

    const tasks = folders
        .map((folder, index) => src(path.join(bundleFolder, folder, '/**/*.js'))// .pipe(plumber())
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(gulpif((!config.devMode), eslint.failAfterError())));

    return merge(tasks, root);
};

// lint single file
export const jslintSingle = filePath => src(filePath)
    .pipe(eslint())
    .pipe(eslint.format());
