var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var uglify = require("gulp-uglify");
var usemin = require("gulp-usemin");
var del = require('del');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task("minification", function() {
    return gulp.src("./www/*.html")
        .pipe(usemin({
            'js': [uglify]
        }))
        .pipe(gulp.dest("./www/dist"));
});

/* **********************************************************************************
 * This task is called from a hook to delete unnecessary files for building
 * **********************************************************************************/
gulp.task('delete-files', function() {
    del([
        'platforms/android/assets/www/dist/**',
        'platforms/android/assets/www/lib/**',
        '!platforms/android/assets/www/lib',
        '!platforms/android/assets/www/lib/ionic',
        '!platforms/android/assets/www/lib/ionic/fonts',
        '!platforms/android/assets/www/lib/ionic/fonts/ionicons.eot',
        '!platforms/android/assets/www/lib/ionic/fonts/ionicons.svg',
        '!platforms/android/assets/www/lib/ionic/fonts/ionicons.ttf',
        '!platforms/android/assets/www/lib/ionic/fonts/ionicons.woff',
        'platforms/android/assets/www/app/**/*.js',
        'platforms/android/assets/www/css/ionic.app.css',
        'platforms/android/assets/www/css/ionic.app.min.css',
        'platforms/ios/www/dist/**',
        'platforms/ios/www/lib/**',
        '!platforms/ios/www/lib',
        '!platforms/ios/www/lib/ionic',
        '!platforms/ios/www/lib/ionic/fonts',
        '!platforms/ios/www/lib/ionic/fonts/ionicons.eot',
        '!platforms/ios/www/lib/ionic/fonts/ionicons.svg',
        '!platforms/ios/www/lib/ionic/fonts/ionicons.ttf',
        '!platforms/ios/www/lib/ionic/fonts/ionicons.woff',
        'platforms/ios/www/app/**/*.js',
        'platforms/ios/www/css/ionic.app.css',
        'platforms/ios/www/css/ionic.app.min.css',
        './www/dist/**'
    ])
    .catch(function(err) {
        console.log('Error while deleting files');
        console.log(err);
    });
});

/* **********************************************************************************
 * This task is called from a hook to prepare files for building
 * **********************************************************************************/
gulp.task('build-prepare', ['minification']);
