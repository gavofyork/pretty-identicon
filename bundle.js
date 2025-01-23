// Original source: https://gist.github.com/adamwdraper/4212319
// Modifications: Loops through subdirectories 
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const walkPath = path.join(__dirname, 'designs');

const next = (dir, list, i, done) => {
    let file = list[i++];
    if (!file) return done(null);
    file = dir + '/' + file;
    const subFolderName = dir.slice(walkPath.length + 1);

    fs.stat(file, (error, stat) => {
        if (error) throw error;
        if (stat && stat.isDirectory()) {
            walk(file, (error) => {
                if (error) throw error;
                next(dir, list, i, done);
            });
        } else {
            let rollupCommand;
            if (subFolderName) {
                rollupCommand = `rollup -i ${file} -o out/${subFolderName}/$(basename ${file}) -f es -p 'terser={mangle: {reserved: [\"draw\"]}}';`;
            } else {
                rollupCommand = `rollup -i ${file} -o out/$(basename ${file}) -f es -p 'terser={mangle: {reserved: [\"draw\"]}}';`;
            }
            execSync(rollupCommand, { encoding: 'utf-8' });  // default: 'buffer'
            next(dir, list, i, done);
        }
    });
};

const walk = (dir, done) => {
    fs.readdir(dir, function (error, list) {
        if (error) return done(error);
        next(dir, list, 0, done);
    });
};

walk(walkPath, (error) => {
    if (error) throw error;
});
