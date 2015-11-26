var gulp = require('gulp');
var config = require('../config');
var imagemin = require('gulp-imagemin');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.compressImages.src,
    '/**/*'
    + (config.tasks.compressImages.extensions
      ? '.{' + config.tasks.compressImages.extensions.join(',') + '}'
      : '')),
  dest: path.join(config.root.dest, config.tasks.compressImages.dest)
};

var compressImagesTask = function() {
  console.log(paths.src + ' -> ' + paths.dest);
  gulp.src(paths.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest));
};

gulp.task('compressImages', compressImagesTask);
module.exports = compressImagesTask;
