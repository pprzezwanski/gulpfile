import { stylelintCheck } from './stylelintCheck';

// standalone style check task
export const stylelint = done => new Promise((resolve, reject) => {
	stylelintCheck()
	.on('end', resolve);
}).then(() => {   
	done();
	process.exit(0); 
});