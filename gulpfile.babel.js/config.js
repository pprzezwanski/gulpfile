import path from 'path';
import { mode } from './mode';

// configuration of gulp
export const config = {
    hotReload: true, // hotReload module replacement - set to false if you want to refresh the browser manually
    autoOpen: false, // if true the project will open in new browsers tab on every gulp command (if false we have to open in manually by typing the address logged into the console by browsersync)
    webpacked: true, // if false all js files will be concatenated instead of webpacked (no need to write app.js)
    noBuildTool: false, // if true gulp will use neither broserify nor webpack and instead all modules and vendor will be concatenated 
    checkSizes: false, // if true gulp will log in development mode how much space we have gained with minifying files (for production mode it is default)
    aggressiveStyleLint: false, // if true gulp will console.log errors and in production mode will prevent finalizing while if false gulp will write errors to ./reports/lint/
    optimizeDev: false, // if true gulp will optimize js, css and pug also in development mode 
    turbo: {
        on: true, // when true will make reload parallel to recompile (instead of series)
        delay: 50 // 0 delay works well for almost all changes but usually some of them require additional micro delay f
    },
    paths: {
        devFolder: './src',
        buildFolder: './dist',
        lintReportsFolder: './reports/lint',
        sass: {
            in: './src/styles/styles.scss',
            vendor: './src/styles/vendor/*.scss',
            watch: 'src/styles/**/*.scss',
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
                    all: 'src/js/non-module-globals/*.js*',
                    jquery: 'src/js/non-module-globals/jquery*.js',
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
        entry: path.resolve(__dirname, '../src/js/bundle/app.js'),
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
};