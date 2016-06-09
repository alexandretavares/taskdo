#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var jshint = require('jshint').JSHINT;
var async = require('async');
var recursive = require('recursive-readdir');

var foldersToProcess = [
	'app'
];

foldersToProcess.forEach(function(folder) {
	processFiles("www/" + folder);
});

function processFiles(dir, callback) {
	var errorCount = 0;

	recursive(dir, function (err, files) {
		if (err) {
			console.log('processFiles err: ' + err);
			return;
		}

		async.eachSeries(files, function(file, innercallback) {
			fs.stat(file, function(err, stat) {
				if (!stat.isDirectory()) {
						if (path.extname(file) === ".js") {
							lintFile(file, function(hasError) {
								if (hasError) {
									errorCount++;
								}
								innercallback();
							});
						} else {
							innercallback();
						}
				} else {
					innercallback();
				}
			});
		}, function(error) {
			if (errorCount > 0) {
				process.exit(1);
			}
		});
	});
}

function lintFile(file, callback) {
	console.log("Linting " + file);

	fs.readFile(file, function(err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		if (jshint(data.toString())) {
			// console.log('File ' + file + ' has no errors.');
			// console.log('-----------------------------------------');
			callback(false);
		} else {
			console.log('Errors in file ' + file);
			var out = jshint.data(),
			errors = out.errors;

			for (var j = 0; j < errors.length; j++) {
				console.log(errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' +
errors[j].evidence);
			}
			console.log('-----------------------------------------');
			callback(true);
		}
	});
}
