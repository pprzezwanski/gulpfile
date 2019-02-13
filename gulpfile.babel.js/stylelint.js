import { stylelintCheck, stylelintCheckSingle } from './stylelintCheck';

// standalone style check task
export const stylelint = done => new Promise((resolve, reject) => {
    stylelintCheck()
        .on('end', resolve);
}).then(() => {
    done();
    process.exit(0);
});

export const stylelintSingle = filePath => new Promise((resolve, reject) => {
    stylelintCheckSingle(filePath)
        .on('end', resolve);
});
