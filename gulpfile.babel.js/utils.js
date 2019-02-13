import fs from 'fs';
import path from 'path';

// utility
export const getFolders = dir => fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isDirectory());


// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
// 	console.log(file);
//   });
// });
