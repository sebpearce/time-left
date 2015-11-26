'use strict';

var runSeq = require('run-sequence');

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
    'clean',
    'html',
    'scripts',
    'styles',
    'compressImages',
    'browserSync',
    'watch',
  ], cb);
});
