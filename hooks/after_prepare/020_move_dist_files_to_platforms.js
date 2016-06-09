#!/usr/bin/env node

/**
* After prepare, files are copied to the platforms/ios and platforms/android folders.
* Lets clean up some of those files that arent needed with this hook.
*/
var path = require('path');
var mv = require('mv');

function moveCallback(source, target, err) {
    if (typeof err != 'undefined') {
        console.log("err");
        console.log(err);
        console.log("ERROR when moving: " + source);
    }
}

function move(source, target, mkdir) {
    if (mkdir) {
        mv(source, target, {mkdirp: true}, function(err) {
            moveCallback(source, target, err);
        });
    } else {
        mv(source, target, function(err) {
            moveCallback(source, target, err);
        });
    }
}

var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
var basePath, cssSourcePath, cssTargetPath, jsSourcePath, jsTargetPath, indexSourcePath, indexTargetPath;

for (var x = 0; x < platforms.length; x++) {
    try {
        var platform = platforms[x].trim().toLowerCase();

        if (platform == 'android') {
            basePath = path.join('platforms', platform, 'assets', 'www');
        } else {
            basePath = path.join('platforms', platform, 'www');
        }

        cssSourcePath = path.join(basePath, 'dist', 'css');
        cssTargetPath = path.join(basePath, 'css');

        jsSourcePath = path.join(basePath, 'dist', 'js');
        jsTargetPath = path.join(basePath, 'js');

        indexSourcePath = path.join(basePath, 'dist', 'index.html');
        indexTargetPath = path.join(basePath, 'index.html');

        console.log("Moving dist files to " + platform + " platform");
        move(cssSourcePath, cssTargetPath, true);
        move(jsSourcePath, jsTargetPath, true);
        move(indexSourcePath, indexTargetPath);

    } catch(e) {
        process.stdout.write(e);
    }
}
