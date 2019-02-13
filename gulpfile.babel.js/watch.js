import { parallel, watch, series } from 'gulp';
import { config } from './config';

import { reload, stream } from './browserSync';

// gulp modules imports
import { images } from './images';
import { fonts } from './fonts';
import { sprites } from './sprites';
import { html } from './html';
import { styles } from './styles';
import { scripts } from './scripts';
import { stylelintSingle } from './stylelint';
import { stylelintCheckSingle } from './stylelintCheck';
import { jslint } from './jslint';
import { jslintSingle } from './jslint';


// watch
export const watchFiles = () => {
    const fontsWatcher = watch(config.paths.fonts.watch, series(/* cleanFonts,  */fonts, config.hotReload ? reload : stream));
    const imgWatcher = watch(config.paths.images.watch, series(/* cleanImages,  */images, config.hotReload ? reload : stream));
    const spritesWatcher = watch(config.paths.sprites.watch, series(/* cleanSprites,  */sprites, config.hotReload ? reload : stream));

    [fontsWatcher, imgWatcher, spritesWatcher].forEach((c) => {
        c.on('unlink', (filepath) => {
            const filePathFromSrc = path.relative(path.resolve('src'), filepath);
            // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
            const destFilePath = path.resolve('dist', filePathFromSrc);
            del.sync(destFilePath);
        });
    });

    let htmlWatcher;
    let styleWatcher;
    let jsWatcher;

    if (config.turbo.on) {
        // below we use parallel for tasks to speed up the reloading but have to add additional micro delay
        jsWatcher = watch(
            config.paths.js.watch,
            { delay: config.turbo.delay },
            parallel(scripts, config.hotReload ? reload : stream),
        );
        styleWatcher = watch(
            config.paths.sass.watch,
            { delay: config.turbo.delay },
            series(styles, config.hotReload ? reload : stream),
        );
        htmlWatcher = watch(
            config.paths.pug.watch,
            { delay: config.turbo.delay },
            parallel(html, config.hotReload ? reload : stream),
        );
    } else {
        jsWatcher = watch(
            config.paths.js.watch,
            { delay: 50 },
            series(scripts, config.hotReload ? reload : stream),
        );
        styleWatcher = watch(
            config.paths.sass.watch,
            { delay: 50 },
            series(styles, config.hotReload ? reload : stream),
        );
        htmlWatcher = watch(
            config.paths.pug.watch,
            { delay: 50 },
            series(html, config.hotReload ? reload : stream),
        );
    }

    jsWatcher.on('change', (path, stats) => {
        setTimeout(() => {
            jslintSingle(path)
        }, 500)
    });

    styleWatcher.on('change', (path, stats) => {
        setTimeout(() => {
            stylelintSingle(path)
        }, 500)
    });

    // const stop = () => {
    //     [
    //         fontsWatcher,
    //         imgWatcher,
    //         spritesWatcher,
    //         jsWatcher,
    //         styleWatcher,
    //         htmlWatcher,
    //     ].forEach((c) => {
    //         c.close();
    //     });
    // };

    // return { stop };
};
