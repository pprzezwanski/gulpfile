const { src, dest, parallel, watch, series } = require('gulp');

const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const bs = require('browser-sync').create()
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const del = require('del')
const eslint = require('gulp-eslint')
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
const webpack = require("webpack")
const webpackstream = require("webpack-stream")

sass.compiler = require('node-sass')
   
/**
 * commands : 
 * 'gulp': default task for build and watch (without cleaning before), fully minified + sourcemaps, never stops - neither for refresh nor for git pull and fix conflicts
 * 'gulp refresh': run it in nother terminal to refresh dist folder and reports folder - it will clean folders, make standrad build and terminate itself
 * 'gulp jslint': check js
 * 'NODE_ENV=production gulp': build for production - fully minified, no sourcemaps
 */

// utility for config
const mode = process.env.NODE_ENV || 'development'

// configuration of gulp
const config = {
    hotReload: true, // hotReload module replacement - set to false if you want to refresh the browser manually
    autoOpen: false, // if true the project will open in new browsers tab on every gulp command (if false we have to open in manually by typing the address logged into the console by browsersync)
    webpacked: true, // if false all js files will be concatenated instead of webpacked (no need to write app.js)
    checkSizes: false, // if true 'gulp build' will log how much space we have gained with minifying website
    aggressiveStyleLint: false, // if true gulp will console.log errors and in production mode will prevent finalizing while if false gulp will write errors to ./reports/lint/
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
                vendor: 'src/js/vendor/*.js*'
            },
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
    mode: mode === 'development' // this is set by ENV variables
}

// log config highlights at the beginning of a task
console.log(
    // pkg.name + ' ' + pkg.version + '\n'
    'mode: ' + (config.mode ? 'development' : 'production') + '\n'
    + 'js bundling: ' + (config.webpacked ? 'webpack' : 'concatenation') + '\n'
    + 'browser refresh type: ' + (config.hotReload ? 'hot module replacement': 'watch') + '\n'
    + 'stylelint mode: ' + (config.aggressiveStyleLint ? 'aggressive' : 'hints are available in ./reports/lint')
)

// utility
const getFolders = dir => fs.readdirSync(dir)
	.filter(file => fs.statSync(path.join(dir, file)).isDirectory())

// images
const images = () => src(config.paths.images.in)
    .pipe(newer(config.paths.images.out))
    .pipe(gulpif(config.checkSizes, size({ title: 'before imagemin:' })))
    .pipe(imagemin())
    .pipe(gulpif(config.checkSizes, size({ title: 'after imagemin:' })))
	.pipe(dest(config.paths.images.out));

// icons in sprites
const sprites = done => {
	const folders = getFolders(config.paths.sprites.folder)
    // if (folders.length === 0) return done()
    const root = src(path.join(config.paths.sprites.folder, '/*.svg'))
        .pipe(svgsprite(config.sprite))
        .pipe(rename('sprite.svg'))
        .pipe(gulpif(config.checkSizes, size({ title: 'main sprite:' })))
        .pipe(dest(config.paths.sprites.out))
	const tasks = folders
		.map((folder, index) => src(path.join(config.paths.sprites.folder, folder, '/**/*.svg'))
            .pipe(svgsprite(config.sprite))
            .pipe(rename('sprite-' + folder + '.svg'))
            .pipe(gulpif(config.checkSizes, size({ title: 'additional sprite:' })))
			.pipe(dest(config.paths.sprites.out))
    )
	return merge(tasks, root);
}

// fonts
const fonts = () => src(config.paths.fonts.in)
	.pipe(newer(config.paths.fonts.out))
	.pipe(dest(config.paths.fonts.out))
  
// pug
const html = () => src(config.paths.pug.in)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulpif(config.checkSizes, size({ title: 'HTML before:' })))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulpif(config.checkSizes, size({ title: 'HTML after:' }))) 
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
    .pipe(gulpif(config.checkSizes, size({ title: 'css before:' })))
    .pipe(postcss([
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ]))
    .pipe(gulpif(config.checkSizes, size({ title: 'css after:' })))
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
const js = () => src(config.paths.js.in.modules, { sourcemaps: config.devMode})
    // .pipe(plumber())
    .pipe(gulpif(!config.webpacked, babel({ presets: ['@babel/preset-env'] })))
    .pipe(gulpif(config.webpacked, webpackstream(config.webpack, webpack)))
    .pipe(src(config.paths.js.in.vendor, { sourcemaps: config.devMode }))
    // .pipe(gulpif(!config.webpacked, order([config.paths.js.in.vendor, config.paths.js.in.modules])))
    .pipe(concat('bundle.min.js'))
    .pipe(gulpif(config.checkSizes, size({ title: 'before uglify:' })))
    .pipe(uglify())
    .pipe(gulpif(config.checkSizes, size({ title: 'after uglify:' })))
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
    notify: true
})

// clean factory function
const clean = (path, exit = null) => done => {
    if (path) {
        del(path).then(paths => { done() })
    } else {
        del([
            config.paths.buildFolder + '/*', 
            config.paths.lintReportsFolder + '/*'
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

// watch
watch(config.paths.fonts.watch, series(cleanFonts, fonts, config.hotReload ? reload : stream))
watch(config.paths.images.watch, series(cleanImages, images, config.hotReload ? reload : stream))
watch(config.paths.sprites.watch, series(cleanSprites, sprites, config.hotReload ? reload : stream))
watch(config.paths.js.watch, series(js, config.hotReload ? reload : stream))
watch(config.paths.sass.watch, series(styles, config.hotReload ? reload : stream))
watch(config.paths.pug.watch, series(html, config.hotReload ? reload : stream))

// public tasks
exports.default = series(parallel(fonts, images, sprites, html, stylelintCheck, styles, js), preview)
exports.refresh = series(clean(), parallel(fonts, images, sprites, html, stylelintCheck, styles, js), exit)
exports.jslint = jslint
