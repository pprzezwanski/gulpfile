import { config } from './config';

import { src } from 'gulp';
import path from 'path';
import merge from 'merge-stream';
import eslint from 'gulp-eslint';
import { getFolders } from './utils';

// util for jslint
const eslintResult = (done, exit = false) => result => {
    result.messages.forEach(c => { console.log(c); });
    if (result.messages.length === 0) { console.log('js validated correctly'); }
    if (exit) {
        done();
        process.exit(0);
    }
};

// lint scripts
export const jslint = done => {
    const bundleFolder = './src/js/bundle';
    const folders = getFolders(bundleFolder);
    if (folders.length === 0) return done();
    
    const root = src(path.join(bundleFolder, '/*.js'))// .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.result(eslintResult(done)));

	const tasks = folders
		.map((folder, index) => {
            return src(path.join(bundleFolder, folder, '/**/*.js'))// .pipe(plumber())
            .pipe(eslint())
            .pipe(eslint.result(eslintResult(done/*, index === folders.length - 1 */)));
        }
    );

    return merge(tasks, root);
};