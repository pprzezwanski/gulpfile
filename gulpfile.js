const { src, dest, parallel, watch, series } = require('gulp');

const pug = require('gulp-pug')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const svgstore = require('gulp-svgstore')
const babel = require('gulp-babel')
const size = require('gulp-size')
const newer = require('gulp-newer')
const fs = require('fs')
const path = require('path')
const merge = require('merge-stream')
const htmlmin = require('gulp-htmlmin')
const stylelint = require('gulp-stylelint')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const pkg = require('./package.json')
const gulpif = require('gulp-if')  

// setup environment variable:
// process.env.NODE_ENV = 'production';

const devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

// hot module replacement - set to false if you want to refresh the browser manually
const hmr = true

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// config object
const paths = {
	devFolder: './src',
    buildFolder: './dist',
    sass: {
        in: './src/sass/**/*.scss',
        out: './dist/css'
    },
	pug: {
        in: './src/pug/*.pug',
        out: './dist/'
    },
    js: {
        in: {
            modules: './src/js/bundle/modules/*.js',
            vendor: './src/js/vendor/*.js*'
        }, 
        out: './dist/js'
    },
	images: {
		in: ['./src/images/**/*.{png,jpg,jpeg,svg}'],
		out: './dist/images'
	},
	fonts: {
		in: './src/fonts/**/*.{woff,woff2}',
		out: './dist/fonts/'
	},
	sprites: {
		folder: './src/icons',
		out: './dist/icons'
	}
}

// images
const images = () => src(paths.images.in)
    .pipe(newer(paths.images.out))
    .pipe(gulpif(!devBuild, size({ title: 'before imagemin:' })))
    .pipe(imagemin())
    .pipe(gulpif(!devBuild, size({ title: 'after imagemin:' })))
	.pipe(dest(paths.images.out));

// icons in sprites
const getFolders = dir => fs.readdirSync(dir)
	.filter(file => fs.statSync(path.join(dir, file)).isDirectory())
	
const sprites = done => {
	const folders = getFolders(paths.sprites.folder)
    if (folders.length === 0) return done()
    
    const root = src(path.join(paths.sprites.folder, '/*.svg'))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename('sprite.svg'))
        .pipe(gulpif(!devBuild, size({ title: 'main sprite:' })))
        // .pipe(size({ title: 'main sprite:' }))
        .pipe(dest(paths.sprites.out))

	const tasks = folders
		.map((folder, index) => src(path.join(paths.sprites.folder, folder, '/**/*.svg'))
			.pipe(svgstore({ inlineSvg: true }))
            .pipe(rename('sprite-' + folder + '.svg'))
            .pipe(gulpif(!devBuild, size({ title: 'additional sprite:' })))
            // .pipe(size({ title: 'additional sprite:' }))
			.pipe(dest(paths.sprites.out))
    )

	return merge(tasks, root);
}

// fonts
const fonts = () => src(paths.fonts.in)
	.pipe(newer(paths.fonts.out))
	.pipe(dest(paths.fonts.out))
  
// pug
const html = () => src(paths.pug.in)
    .pipe(pug())
    .pipe(size({ title: 'HTML before:' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ title: 'HTML after:' })) 
	.pipe(dest(paths.pug.out))

// sass
sass.compiler = require('node-sass');
const styles = () => src(paths.sass.in)
    .pipe(sourcemaps.init())
    .pipe(stylelint({
        failAfterError: false,
        reportOutputDir: 'reports/lint',
        reporters: [{ formatter: 'string', save: 'sass-lint-report.txt', console: false }]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ]))
   .pipe(sourcemaps.write('.'))
   .pipe(dest(paths.sass.out))

// scripts
const js = () => src(paths.js.in.modules, { sourcemaps: devBuild })
    .pipe(babel({ presets: ['env'] }))
    .pipe(src(paths.js.in.vendor, { sourcemaps: true }))
    .pipe(concat('bundle.min.js'))
    .pipe(gulpif(!devBuild, size({ title: 'before uglify:' })))
    .pipe(uglify())
    .pipe(gulpif(!devBuild, size({ title: 'after uglify:' })))
    .pipe(dest('./dist/js', { sourcemaps: '.'}))

// webpack js builds
// const jsbuild = () => src(paths.js.in.modules, { sourcemaps: true })
//     .pipe(plumber())
//     .pipe(webpackstream(webpackconfig, webpack))
//     .pipe(dest('./dist/js', { sourcemaps: '.' }))


const eslintResult = (done, exit = false) => result => {
    // Called for each ESLint result.
    console.log(`ESLint result: ${result.filePath}`)
    console.log(`# Messages: ${result.messages.length}`)
    console.log(`# Warnings: ${result.warningCount}`)
    console.log(`# Errors: ${result.errorCount}`)

    result.messages.forEach(c => {
        console.log(c)
    })

    if (result.messages.length === 0) {
        console.log('js validated correctly')
    }

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
const serve = () => browserSync({
    server:{ baseDir: paths.buildFolder }, 
    port: 3000,
    open: false,
    notify: true
})

// clean dist folder
const clean = done => {
    del([paths.buildFolder + '/*']).then(paths => { 
        done() 
        process.exit(0)
    })
}

// clean dist/icons folder
const cleanSprites = done => {
    del(['./dist/icons/*.svg']).then(paths => { done() })
}

// reload browser (it will inject where possible without reloading)
const reload = done => { 
	browserSync.reload()
	done()
}

// stream browserSync
const stream = done => { 
	browserSync.stream()
	done()
}

// watch
watch('src/js/bundle/**/*.js', series(js, reload))
watch('src/sass/**/*.scss', series(styles, hmr ? reload : stream))
watch('src/pug/**/*.pug', series(html, reload))
watch('src/icons/**/*.svg', series(cleanSprites, sprites, reload))

// public tasks
exports.default = series(parallel(images, sprites, fonts, html, styles, js), serve);
exports.build = series(clean, parallel(images, sprites, fonts, html, styles, js));
exports.clean = clean
exports.sprites = sprites
exports.jslint = jslint
