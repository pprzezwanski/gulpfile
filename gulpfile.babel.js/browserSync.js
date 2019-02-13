import browserSync from 'browser-sync';
import { config } from './config';

// browser-sync
const bs = browserSync.create();

// live preview
export const preview = () => bs.init({
    server: config.paths.buildFolder,
    port: 3000,
    open: config.autoOpen || !config.devMode,
    notify: false,
});

// reload browser (it will inject new code where possible without reloading)
export const reload = (done) => {
    bs.reload();
    done();
};

// stream browserSync (needs manual website refresh after the change)
export const stream = (done) => {
    bs.stream();
    done();
};
