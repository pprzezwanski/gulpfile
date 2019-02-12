import fs from 'fs';
import path from 'path';

// utility
export const getFolders = dir => fs.readdirSync(dir)
	.filter(file => fs.statSync(path.join(dir, file)).isDirectory());