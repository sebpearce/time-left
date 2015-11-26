var gulp = require('gulp');
var config = require('../config');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var path = require('path');

var watchTask = function() {
  // get list of tasks to watch from config
  var watchableTasks = config.tasks.watch.watchableTasks;

  watchableTasks.forEach(function(taskName){
    console.log('Watching...');
    var task = config.tasks[taskName];
    if (task) {
      var glob = path.join(
        config.root.src,
        task.src,
        '/**/*'
        + (task.extensions ? '.{' + task.extensions.join(',') + '}' : '')
      );
      console.log('glob = ' + glob);
      watch(glob, function() {
        require('./' + taskName)();
        // reload the browser unless we're doing styles (CSS is injected)
        if (taskName !== 'styles')
          browserSync.reload();
      });
    }
  });
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
