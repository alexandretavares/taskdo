#!/usr/bin/env node

console.log('Deleting unnecessary files...');

var exec = require('child_process').exec;

var child = exec('gulp delete-files', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
