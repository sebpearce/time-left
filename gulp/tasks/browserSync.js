var gulp = require('gulp');
var config = require('../config');

// var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync');

var browserSyncTask = function(){
  browserSync.init(config.tasks.browserSync);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
