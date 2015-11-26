var gulp = require('gulp');
var config = require('../config');

var rimraf = require('gulp-rimraf');

var cleanTask = function() {
  return gulp.src(config.root.dest)
  .pipe(rimraf());
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
