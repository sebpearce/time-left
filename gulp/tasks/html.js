var gulp = require('gulp');
var config = require('../config');
// if (!config.tasks.html) return;
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.html.src,
    '*' + (config.tasks.html.extensions
      ? '.{' + config.tasks.html.extensions.join(',') + '}'
      : '')
    ),
  dest: path.join(config.root.dest, config.tasks.html.dest)
};

var htmlTask = function () {
  console.log(paths.src + ' -> ' + paths.dest);
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
