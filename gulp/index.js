// Taken from:
// https://viget.com/extend/gulp-browserify-starter-faq

var gulp = require('gulp');

module.exports = function(tasks) {
  tasks.forEach(function(name) {
    gulp.task(name, require('./tasks/' + name));
  });

  return gulp;
};
