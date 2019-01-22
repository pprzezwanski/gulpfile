/**
 * Gulp with:
 * - "no 'ctr + c' workflow", 
 * -  es6 syntax including import/export for modules
 * -  usefull configuration utilities, like choosing between 
 *    broserify, webpack and concatenation as build tool
 * -  source maps for html, css and js for every optional build tool
 * -  css and js linters
 * -  support for jquery (if needed)
 * 
 * Please look at the beginning of config object to see some options
 * 
 * Commands:
 * 
 * 'gulp': initial build and live preview with hmr/watch functionality. 
 * 
 * 'gulp refresh': if for some reason (but there should not be any 
 * including images, fonts, incons and git operations)
 * you want to clean dist folder and build it again, 
 * don't terminate gulp watch. Just open another terminal 
 * and make 'gulp refresh' - it will clean dist and reports folders,
 * rebuild project and terminate itself while still running 'gulp' process 
 * will take care for further watching
 * 
 * 'gulp info': to see the choosen config options (run it as parallel in another temrinal) 
 * 
 * 'js lint': if you want to check js with linter
 * 
 * 'yarn prod' or NODE_ENV=production gulp refresh': build for production - fully minified, 
 * no sourcemaps, gulp will log file size before and after minification
 */

const { src, dest, parallel, watch, series } = require('gulp');

const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const bs = require('browser-sync').create()
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const del = require('del')
const eslint = require('gulp-eslint')
// const fontgen = require('gulp-fontgen')
const fs = require('fs')
const gulpif = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const merge = require('merge-stream')
const newer = require('gulp-newer')
const order = require('gulp-order')
const path = require('path')
const pkg = require('./package.json')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const size = require('gulp-size')
const sourcemaps = require('gulp-sourcemaps')
const stylelinter = require('gulp-stylelint')
const svgsprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify')

// for webpack
const webpack = require("webpack")
const webpackstream = require("webpack-stream")

// for browserify
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');

// for sass
sass.compiler = require('node-sass')
   
// utility for config
const mode = process.env.NODE_ENV || 'development'

// configuration of gulp
const config = {
    hotReload: true, // hotReload module replacement - set to false if you want to refresh the browser manually
    autoOpen: true, // if true the project will open in new browsers tab on every gulp command (if false we have to open in manually by typing the address logged into the console by browsersync)
    webpacked: true, // if false all js files will be concatenated instead of webpacked (no need to write app.js)
    noBuildTool: false, // if true gulp will use neither broserify nor webpack and instead all modules and vendor will be concatenated 
    checkSizes: false, // if true gulp will log in development mode how much space we have gained with minifying files (for production mode it is default)
    aggressiveStyleLint: false, // if true gulp will console.log errors and in production mode will prevent finalizing while if false gulp will write errors to ./reports/lint/
    uglifyJs: false, // if true gulp will uglify js also in development mode 
    paths: {
        devFolder: './src',
        buildFolder: './dist',
        lintReportsFolder: './reports/lint',
        sass: {
            in: './src/sass/styles.scss',
            vendor: './src/sass/vendor/*.scss',
            watch: 'src/sass/**/*.scss',
            out: './dist/css'
        },
        stylelintCheck: {
            in: ['./src/sass/**/*.scss', '!./src/sass/vendor/*.scss']
        },
        pug: {
            in: './src/pug/*.pug',
            watch: 'src/pug/**/*.pug',
            out: './dist/'
        },
        js: {
            in: {
                modules: 'src/js/bundle/modules/*.js',
                vendor: {
                    all: 'src/js/vendor/*.js*',
                    jquery: 'src/js/vendor/jquery*.js',
                },
            },
            temp: 'src/js/gulp-temp',
            watch: 'src/js/bundle/**/*.js',
            out: './dist/js'
        },
        images: {
            in: ['./src/images/**/*.{png,jpg,jpeg,svg}'],
            watch: './src/images/**/*',
            out: './dist/images'
        },
        fonts: {
            in: './src/fonts/**/*.{woff,woff2}',
            // in: './src/fonts/**/*.{ttf,otf}',
            watch: './src/fonts/**/*',
            out: './dist/fonts/'
        },
        sprites: {
            folder: './src/icons',
            watch: 'src/icons/**/*.svg',
            out: './dist/icons'
        }
    },
    sass: { // config for gulp-sass plugin
        precision: 10,
        imagePath: './src/images', // will be prepended to image name in sass files
    },
    sprite: { // config for gulp-svg-sprite plugin
        mode: {
            symbol: { // symbol mode to build the SVG
                render: {
                    css: false, // CSS output option for icon sizing
                    scss: false // SCSS output option for icon sizing
                },
            }
        }
    },
    styleLinter: { // config for gulp-stylelint plugin
        // failAfterError: false,
        reportOutputDir: 'reports/lint',
        // reporters: [{ formatter: 'string', save: 'sass-lint-report.txt', console: false }]
    },
    webpack: {
        mode,
        // devtool: 'eval-source-map',
        entry: path.resolve(__dirname, './src/js/bundle/app.js'),
        output: {
            // path: path.resolve(__dirname, 'dist/js'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] }
                    }
                }
            ]
        }
    },
    devMode: mode === 'development', // this is set by ENV variables and will result in 'true' in development mode
    mode: mode // this is set by ENV variables and results is 'development' or 'production'
}

// log config highlights at the beginning of a task
console.log(
    // pkg.name + ' ' + pkg.version + '\n'
    'mode: ' + config.mode + '\n'
    + 'js bundling: ' + (
        config.noBuildTool 
            ? 'concatenation without build tool' 
            : config.webpacked ? 'webpack' : 'browserify'
        ) + '\n'
    + 'browser refresh type: ' + (config.hotReload ? 'hot module replacement': 'watch') + '\n'
    + 'preview auto-open: ' + (config.autoOpen ? 'yes': 'no') + '\n'
    + 'stylelint mode: ' + (config.aggressiveStyleLint ? 'aggressive' : 'hints are available in ./reports/lint') + '\n'
    + '"gulp info" in another terminal to log this summary' + '\n'
    + '"gulp refresh" in another terminal to clean folders andrebuild while watching'
)

// utility
const getFolders = dir => fs.readdirSync(dir)
	.filter(file => fs.statSync(path.join(dir, file)).isDirectory())

// images
const images = () => src(config.paths.images.in)
    .pipe(newer(config.paths.images.out))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'before imagemin:' })))
    .pipe(imagemin())
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'after imagemin:' })))
	.pipe(dest(config.paths.images.out));

// icons in sprites
const sprites = done => {
	const folders = getFolders(config.paths.sprites.folder)
    // if (folders.length === 0) return done()
    const root = src(path.join(config.paths.sprites.folder, '/*.svg'))
        .pipe(svgsprite(config.sprite))
        .pipe(rename('sprite.svg'))
        .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'main sprite:' })))
        .pipe(dest(config.paths.sprites.out))
	const tasks = folders
		.map((folder, index) => src(path.join(config.paths.sprites.folder, folder, '/**/*.svg'))
            .pipe(svgsprite(config.sprite))
            .pipe(rename('sprite-' + folder + '.svg'))
            .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'additional sprite:' })))
			.pipe(dest(config.paths.sprites.out))
    )
	return merge(tasks, root);
}

// fonts
const fonts = () => src(config.paths.fonts.in)
    .pipe(newer(config.paths.fonts.out))
    // .pipe(fontgen({ dest: config.paths.fonts.out }));
	.pipe(dest(config.paths.fonts.out))
  
// pug
const html = () => src(config.paths.pug.in)
    // .pipe(plumber())
    .pipe(pug())
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'HTML before:' })))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'HTML after:' }))) 
	.pipe(dest(config.paths.pug.out))
    
// style linter for complex tasks like default, build, prod 
const stylelintCheck = () => src(config.paths.stylelintCheck.in)
    .pipe(stylelinter(Object.assign(config.styleLinter, { 
        failAfterError: config.aggressiveStyleLint && config.mode === 'production', 
        reporters: [{ 
            formatter: 'string',
            save: 'sass-lint-report.txt',
            console: config.aggressiveStyleLint 
        }]
    })))

// sass
const styles = () => src(config.paths.sass.in)
    .pipe(gulpif(config.devMode, sourcemaps.init()))
    .pipe(sass((config.sass)).on('error', sass.logError))
    // .pipe(src(config.paths.sass.vendor))
    // .pipe(src(concate('styles.css')))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'css before:' })))
    .pipe(postcss([
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ]))
    .pipe(gulpif(config.checkSizes || !config.devMode, size({ title: 'css after:' })))
    .pipe(gulpif(config.devMode, sourcemaps.write('.')))
    .pipe(dest(config.paths.sass.out))

// standalone style check task
const stylelint = done => new Promise((resolve, reject) => {
        stylelintCheck()
        .on('end', resolve)
    }).then(() => {   
        done()
        process.exit(0) 
    })

// scripts
let initialBuild = true

const jsWebpacked = () => {
    const sourceStream = src(config.paths.js.in.modules, { sourcemaps: config.devMode}) 
    const middleStream = initialBuild ? sourceStream.pipe(plumber()) : sourceStream
    initialBuild = false;

    return middleStream
        .pipe(gulpif(config.webpacked, webpackstream(config.webpack, webpack)))
        .pipe(rename('temp.js'))
        .pipe(dest(config.paths.js.temp/* , { sourcemaps: '.'} */))
}

// old jsWebpacked kept 
// const jsWebpacked = () => src(config.paths.js.in.modules, { sourcemaps: config.devMode})
//     .pipe(gulpif(config.webpacked, webpackstream(config.webpack, webpack)))
//     .pipe(rename('temp.js'))
//     .pipe(dest(config.paths.js.temp/* , { sourcemaps: '.'} */))

const jsBrowserified = () => {
    return browserify({
        entries: './src/js/bundle/app.js',
        debug: true
    })
    .transform(babelify.configure({ presets: ['@babel/preset-env'] }))
    .bundle()
    .pipe(source('temp.js'))
    .pipe(buffer())
    .pipe(dest(config.paths.js.temp/* , { sourcemaps: '.'} */))
}

const jsOnlyConcat = () => src(config.paths.js.in.modules, { sourcemaps: config.devMode })
    .pipe(concat('temp.js'))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest(config.paths.js.temp, { sourcemaps: '.'}))

const jsAddGlobals = () => src([
        config.paths.js.in.vendor.jquery,
        config.paths.js.in.vendor.all,
        config.paths.js.temp + '/*.js'
    ], { sourcemaps: config.devMode })
    .pipe(concat('bundle.min.js'))
    .pipe(gulpif((config.uglifyJs && config.checkSizes) || !config.devMode, size({ title: 'before uglify:' })))
    .pipe(gulpif(config.uglifyJs || !config.devMode, uglify()))
    // .pipe(uglify())
    // .on('error', log.error)
    .pipe(gulpif((config.uglifyJs && config.checkSizes) || !config.devMode, size({ title: 'after uglify:' })))
    .pipe(dest('./dist/js', { sourcemaps: '.'}))

// util for jslint
const eslintResult = (done, exit = false) => result => {
    result.messages.forEach(c => { console.log(c) })
    if (result.messages.length === 0) { console.log('js validated correctly') }
    if (exit) {
        done()
        process.exit(0)
    }
}

// lint scripts
const jslint = done => {
    const bundleFolder = './src/js/bundle'
    const folders = getFolders(bundleFolder)
    if (folders.length === 0) return done()
    
    const root = src(path.join(bundleFolder, '/*.js'))// .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.result(eslintResult(done)))

	const tasks = folders
		.map((folder, index) => {
            return src(path.join(bundleFolder, folder, '/**/*.js'))// .pipe(plumber())
            .pipe(eslint())
            .pipe(eslint.result(eslintResult(done, /* index === folders.length - 1 */)))
        }
    )

    return merge(tasks, root);
}

// live preview
const preview = () => bs.init({
    server: config.paths.buildFolder, 
    port: 3000,
    open: config.autoOpen,
    notify: false
})

// clean factory function
const clean = (path, exit = null) => done => {
    if (path) {
        del(path).then(paths => { done() })
    } else {
        del([
            config.paths.buildFolder + '/*', 
            config.paths.lintReportsFolder + '/*',
            config.paths.tempFolder + '/*'
        ]).then(paths => { 
            done() 
            exit && process.exit(0)
        })
    }
}

const cleanSprites = clean(config.paths.sprites.out)
const cleanImages = clean(config.paths.images.out)
const cleanFonts = clean(config.paths.fonts.out)

// reload browser (it will inject new code where possible without reloading)
const reload = done => { 
	bs.reload()
	done()
}

// stream browserSync (needs manual website refresh after the change)
const stream = done => { 
	bs.stream()
	done()
}

// exit gulp
const exit = done => { 
    done()
    process.exit(0) 
}

// js tasks grouped
const js = series(
    config.noBuildTool 
        ? jsOnlyConcat
        : config.webpacked ? jsWebpacked : jsBrowserified,
    jsAddGlobals
)

// watch (some of tasks are made parallel to speed up reloading process)
const fontsWatcher = watch(config.paths.fonts.watch, series(/* cleanFonts,  */fonts, config.hotReload ? reload : stream))
const imgWatcher = watch(config.paths.images.watch, series(/* cleanImages,  */images, config.hotReload ? reload : stream))
const spritesWatcher = watch(config.paths.sprites.watch, series(/* cleanSprites,  */sprites, config.hotReload ? reload : stream))
watch(config.paths.js.watch, parallel(js, config.hotReload ? reload : stream))
watch(config.paths.sass.watch, parallel(styles, config.hotReload ? reload : stream))
watch(config.paths.pug.watch, parallel(html, config.hotReload ? reload : stream))

;[fontsWatcher, imgWatcher, spritesWatcher].forEach(c => {
    c.on('unlink', filepath => {
        const filePathFromSrc = path.relative(path.resolve('src'), filepath);
        // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
        const destFilePath = path.resolve('dist', filePathFromSrc);
        del.sync(destFilePath);
    })
})

// public tasks
exports.default = series(parallel(fonts, images, sprites, html, stylelintCheck, styles, js), preview)
exports.refresh = series(clean(), parallel(fonts, images, sprites, html, stylelintCheck, styles, js), exit)
exports.jslint = jslint
exports.info = exit