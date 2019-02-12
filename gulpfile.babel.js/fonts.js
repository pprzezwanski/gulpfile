import { config } from './config';

import { src, dest, parallel, watch, series } from 'gulp';

import newer from 'gulp-newer';

// fonts
export const fonts = () => src(config.paths.fonts.in)
    .pipe(newer(config.paths.fonts.out))
    // .pipe(fontgen({ dest: config.paths.fonts.out }));
	.pipe(dest(config.paths.fonts.out));