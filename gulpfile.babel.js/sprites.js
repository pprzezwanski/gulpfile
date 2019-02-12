import { config } from './config';

import { src, dest, parallel, watch, series } from 'gulp';
import size from 'gulp-size';
import gulpif from 'gulp-if';

import path from 'path';
import merge from 'merge-stream';
import svgsprite from 'gulp-svg-sprite';
import rename from 'gulp-rename';

import { getFolders } from './utils';

// icons in sprites
export const sprites = done => {
	const folders = getFolders(config.paths.sprites.folder);
    // if (folders.length === 0) return done()
    const root = src(path.join(config.paths.sprites.folder, '/*.svg'))
        .pipe(svgsprite(config.sprite))
        .pipe(rename('sprite.svg'))
        .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'main sprite:' })))
        .pipe(dest(config.paths.sprites.out));
	const tasks = folders
		.map((folder, index) => src(path.join(config.paths.sprites.folder, folder, '/**/*.svg'))
            .pipe(svgsprite(config.sprite))
            .pipe(rename('sprite-' + folder + '.svg'))
            .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'additional sprite:' })))
			.pipe(dest(config.paths.sprites.out))
    );
	return merge(tasks, root);
};