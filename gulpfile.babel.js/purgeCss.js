// purge unsued css from bootstrap grid

import { src, dest } from 'gulp';
import size from 'gulp-size';
import purgecss from 'gulp-purgecss';
import { config } from './config';

export const purgeCss = () => src(config.paths.purgeCss.in)
    .pipe(size({ title: 'before purging css:' }))
    .pipe(purgecss({
        content: config.paths.purgeCss.content,
        whitelistPatterns: config.purgeCssWhiteList,
        // whitelist: [('')],
    }))
    .pipe(size({ title: 'after purging css:' }))
    .pipe(dest(config.paths.purgeCss.out));
