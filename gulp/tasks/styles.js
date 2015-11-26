var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.styles.src + '/**/*.css'),
  mainSrc: path.join(config.root.src, config.tasks.styles.mainSrc),
  dest: path.join(config.root.dest, config.tasks.styles.dest)
};

var stylesTask = function() {
  // copy regular CSS files to dest
  gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));

  // process main SCSS file and send to dest
  return sass(paths.mainSrc, config.tasks.styles.sass)
    .on('error', sass.logError)
    .pipe(autoprefixer(config.tasks.styles.autoprefixer))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

module.exports = stylesTask;
gulp.task('styles', stylesTask);
