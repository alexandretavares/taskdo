#!/usr/bin/env node

/**
* After prepare, files are copied to the platforms/ios and platforms/android folders.
* Lets clean up some of those files that arent needed with this hook.
*/
var fs = require('fs');
var path = require('path');

var deleteFolderRecursive = function(removePath) {
    if (fs.existsSync(removePath)) {
        fs.readdirSync(removePath).forEach(function(file,index) {
            var curPath = path.join(removePath, file);

            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(removePath);
    }
};

// go through each of the platform directories that have been prepared
var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
var cssPath, jsPath;

for (var x = 0; x < platforms.length; x++) {
    try {
        var platform = platforms[x].trim().toLowerCase();

        if (platform == 'android') {
            cssPath = path.join('platforms', platform, 'assets', 'www', 'css');
            jsPath = path.join('platforms', platform, 'assets', 'www', 'js');
        } else {
            cssPath = path.join('platforms', platform, 'www', 'css');
            jsPath = path.join('platforms', platform, 'www', 'js');
        }

        console.log("Deleting css and js source folders to " + platform + " platform");
        deleteFolderRecursive(cssPath);
        deleteFolderRecursive(jsPath);

    } catch(e) {
        process.stdout.write(e);
    }
}
