import { src, dest } from 'gulp';
import checkCSS from 'gulp-check-unused-css';

// chceck unsued css and undefined html classes
export const unusedCss = () => src(['./dist/css/styles.css', './dist/*.html'])
.pipe(checkCSS({
    globals: [ require( './../src/styles/vendor/globals/globals' ) ]
}));