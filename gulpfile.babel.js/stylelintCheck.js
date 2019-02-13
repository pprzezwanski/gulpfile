import { src } from 'gulp';
import stylelinter from 'gulp-stylelint';
import { config } from './config';

// style linter for complex tasks like default, build, prod
export const stylelintCheck = () => src(config.paths.stylelintCheck.in)
    .pipe(stylelinter(Object.assign(config.styleLinter, {
        failAfterError: config.stylelint.aggressive && config.mode === 'production',
        reporters: [{
            formatter: 'string',
            save: 'sass-lint-report.txt',
            console: config.stylelint.log,
        }],
    })));

export const stylelintCheckSingle = filePath => src(filePath)
    .pipe(stylelinter(Object.assign(config.styleLinter, {
        failAfterError: config.stylelint.aggressive && config.mode === 'production',
        reporters: [{
            formatter: 'string',
            console: config.stylelint.log,
        }],
    })));
