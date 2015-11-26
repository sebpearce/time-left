var gulp = require('gulp');
var config = require('../config');

var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.scripts.src),
  mainSrc: path.join(config.root.src, config.tasks.scripts.browserify.mainSrc),
  dest: path.join(config.root.dest, config.tasks.scripts.dest)
};

var scriptsTask = function() {
  // run JSHint on src scripts
  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  console.log(paths.mainSrc + ' -> ' + paths.dest);
  // bundle main.js and its dependencies with Browserify
  return browserify({ entries: [paths.mainSrc] })
    .bundle()
    .pipe(source(config.tasks.scripts.browserify.outputFile))
    .pipe(buffer()) // <- convert from streaming to buffered vinyl file object
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
};

gulp.task('scripts', scriptsTask);
module.exports = scriptsTask;
