import { config } from './config';

import { src, dest, series } from 'gulp';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';

// for webpack
import webpack from "webpack";
import webpackstream from "webpack-stream";
import babel from 'gulp-babel';

// for browserify
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

// scripts
let initialBuild = true; // this is because plumber was causing reload freezes on js change but it is helpful to prevent gulp quit on initial build error

const jsWebpacked = () => {
    const sourceStream = src(config.paths.js.in.modules, { sourcemaps: config.devMode}); 
    const middleStream = initialBuild ? sourceStream.pipe(plumber()) : sourceStream;
    initialBuild = false; 

    return middleStream
        .pipe(webpackstream(config.webpack, webpack))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(rename('temp.js'))
        .pipe(dest(config.paths.js.temp/* , { sourcemaps: '.'} */));
};

const jsBrowserified = () => {
    return browserify({
        entries: './src/js/bundle/app.js',
        debug: true
    })
    .transform(babelify.configure({ presets: ['@babel/preset-env'] }))
    .bundle()
    .pipe(source('temp.js'))
    .pipe(buffer())
    .pipe(dest(config.paths.js.temp/* , { sourcemaps: '.'} */));
};

const jsOnlyConcat = () => src(config.paths.js.in.modules, { sourcemaps: config.devMode })
    .pipe(concat('temp.js'))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest(config.paths.js.temp, { sourcemaps: '.'}));

const jsAddGlobals = () => src([
        config.paths.js.in.vendor.jquery,
        config.paths.js.in.vendor.all,
        config.paths.js.temp + '/*.js'
    ], { sourcemaps: config.devMode })
    .pipe(concat('bundle.min.js'))
    .pipe(gulpif((config.optimizeDev && config.checkSizes) || !config.devMode, size({ title: 'before uglify:' })))
    .pipe(gulpif(config.optimizeDev || !config.devMode, uglify()))
    // .pipe(uglify())
    // .on('error', log.error)
    .pipe(gulpif((config.optimizeDev && config.checkSizes) || !config.devMode, size({ title: 'after uglify:' })))
    .pipe(dest('./dist/js', { sourcemaps: '.'}));

// util for jslint
const eslintResult = (done, exit = false) => result => {
    result.messages.forEach(c => { console.log(c); });
    if (result.messages.length === 0) { console.log('js validated correctly'); }
    if (exit) {
        done();
        process.exit(0);
    }
};

// js tasks grouped
export const scripts = series(
    config.noBuildTool 
        ? jsOnlyConcat
        : config.webpacked ? jsWebpacked : jsBrowserified,
    jsAddGlobals
);