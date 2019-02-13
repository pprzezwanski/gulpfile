import { src } from 'gulp';
import checkCSS from 'gulp-check-unused-css';
import { config } from './config';

// check unsued css and undefined html classes
// export const unusedCss = () => src(['./dist/css/styles.css', './dist/*.html'])
export const unusedCss = () => src([
    config.paths.unusedCssCheck.in,
    config.paths.unusedCssCheck.html,
]).pipe(checkCSS({
    globals: [require(config.paths.unusedCssCheck.globals)],
}));
