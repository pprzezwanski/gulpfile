/* eslint-disable max-len */

const mode = process.env.NODE_ENV || 'development';

const root = './';

// configuration of gulp
export const config = {
    hotReload: true, // hotReload module replacement - set to false if you want to refresh the browser manually
    autoOpen: false, // if true the project will open in new browsers tab on every gulp command (if false we have to open in manually by typing the address logged into the console by browsersync)
    webpacked: true, // if false all js files will be concatenated instead of webpacked (no need to write app.js)
    noBuildTool: false, // if true gulp will use neither broserify nor webpack and instead all modules and vendor will be concatenated
    checkSizes: false, // if true gulp will log in development mode how much space we have gained with minifying files (for production mode it is default)
    stylelint: {
        log: true, // if true stylint will log style errors in development mode while watching
        aggressive: true, // if true stylint will stop production build if any style errors and log them
        autoFix: true, // if true gulp will correct any stylelint mistakes
    },
    // aggressiveStyleLint: true, // if true gulp will console.log errors and in production mode will prevent finalizing while if false gulp will write errors to ./reports/lint/
    optimizeDev: false, // if true gulp will optimize js, css and pug also in development mode
    turbo: {
        on: false, // when true will make reload parallel to recompile (instead of series)
        delay: 100, // 0 delay works well for almost all changes but usually some of them require additional micro delay f
    },
    purgeCssWhiteList: [/mkto/, /tns/, /data-subtly/, /has/, /is/, /nav/], // will not purge any class matched by regex
    paths: {
        devFolder: `${root}src`,
        buildFolder: `${root}dist`,
        lintReportsFolder: `${root}reports/lint`,
        pug: {
            in: `${root}src/pug/*.pug`,
            watch: `${root}src/pug/**/*.pug`,
            out: `${root}dist/`,
        },
        sass: {
            in: `${root}src/sass/styles.scss`,
            vendor: `${root}src/sass/vendor/*.scss`,
            watch: `${root}src/sass/**/*.scss`,
            out: `${root}dist/css`,
        },
        stylelintCheck: {
            in: [
                `${root}src/sass/**/*.scss`,
                `!${root}src/sass/vendor/**/*.scss`,
            ],
        },
        unusedCssCheck: {
            in: `${root}dist/css/styles.css`,
            html: `${root}dist/*.html`,
            globals: './checkCssGlobals',
        },
        purgeCss: {
            in: `${root}dist/css/styles.css`,
            out: `${root}dist/css/`,
            content: [`${root}dist/index.html`],
        },
        js: {
            in: {
                modules: `${root}src/js/bundle/modules/*.js`,
                vendor: {
                    all: `${root}src/js/non-module-globals/**/*.js*`,
                    jquery: `${root}src/js/non-module-globals/jquery*.js`,
                },
            },
            temp: `${root}temp/gulp-temp`,
            watch: `${root}src/js/bundle/**/*.js`,
            out: `${root}dist/js`,
        },
        images: {
            in: [`${root}src/images/**/*.{png,jpg,jpeg,svg}`],
            watch: `${root}src/images/**/*`,
            out: `${root}dist/images`,
        },
        fonts: {
            in: `${root}src/fonts/**/*.{woff,woff2}`,
            // in: root + 'src/fonts/**/*.{ttf,otf}',
            watch: `${root}src/fonts/**/*`,
            out: `${root}dist/fonts/`,
        },
        sprites: {
            folder: `${root}src/icons`,
            watch: `${root}src/icons/**/*.svg`,
            out: `${root}dist/icons`,
        },
    },
    sass: {
        // config for gulp-sass plugin
        precision: 10,
        imagePath: `${root}src/images`, // will be prepended to image name in sass files
    },
    sprite: {
        // config for gulp-svg-sprite plugin
        mode: {
            symbol: {
                // symbol mode to build the SVG
                render: {
                    css: false, // CSS output option for icon sizing
                    scss: false, // SCSS output option for icon sizing
                },
            },
        },
    },
    styleLinter: {
        // config for gulp-stylelint plugin
        // failAfterError: false,
        reportOutputDir: `${root}reports/lint`,
        // reporters: [{ formatter: 'string', save: 'sass-lint-report.txt', console: false }]
    },
    webpack: {
        mode,
        // devtool: 'eval-source-map',
        entry: `${root}src/js/bundle/app.js`,
        output: {
            // path: path.resolve(__dirname, 'dist/js'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] },
                    },
                },
            ],
        },
    },
    devMode: mode === 'development', // this is set by ENV variables and will result in 'true' in development mode
    mode, // this is set by ENV variables and results is 'development' or 'production'
};
