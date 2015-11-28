'use strict';

var runSeq = require('run-sequence');
var deploy = require('gulp-gh-pages');
var config = require('./gulp/config')

var gulp = require('./gulp')([
  'clean',
  'html',
  'scripts',
  'styles',
  'compressImages',
  'browserSync',
  'watch',
]);


gulp.task('default', function (cb) {
  runSeq('clean', [
    'html',
    'scripts',
    'styles',
    'compressImages',
    'browserSync',
    'watch',
  ], cb);
});

/**
 * Push build to gh-pages (creates branch if it doesn't exist)
 */
gulp.task('deploy', function () {
  return gulp.src('./' + config.root.dest + '**/*')
  .pipe(deploy());
});
