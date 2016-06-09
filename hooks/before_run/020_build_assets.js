#!/usr/bin/env node

console.log('Running Gulp tasks. Please wait...');

var exec = require('child_process').exec;

var child = exec('gulp build-prepare', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
