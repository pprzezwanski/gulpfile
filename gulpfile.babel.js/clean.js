import { config } from './config';
import del from 'del';
import { exit } from './exit';

// clean factory function
export const clean = (path, exit = null) => done => {
    if (path) {
        del(path).then(paths => { done(); });
    } else {
        del([
            config.paths.buildFolder + '/*', 
            config.paths.lintReportsFolder + '/*',
            config.paths.tempFolder + '/*'
        ]).then(paths => { 
            done(); 
            exit && process.exit(0);
        });
    }
};