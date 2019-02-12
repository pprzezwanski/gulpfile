import { config } from './config';
import { src } from 'gulp';
import stylelinter from 'gulp-stylelint';

// style linter for complex tasks like default, build, prod 
export const stylelintCheck = () => src(config.paths.stylelintCheck.in)
    .pipe(stylelinter(Object.assign(config.styleLinter, { 
        failAfterError: config.aggressiveStyleLint && config.mode === 'production', 
        reporters: [{ 
            formatter: 'string',
            save: 'sass-lint-report.txt',
            console: config.aggressiveStyleLint 
        }]
    })));