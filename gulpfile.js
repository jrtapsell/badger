var gulp = require('gulp');
var sitemap = require('gulp-sitemap');
var swPrecache = require('sw-precache');


gulp.task('make-sw', function(callback) {
  var path = require('path');

  swPrecache.write("dist/service-worker.js", {
    staticFileGlobs: ['dist/**/*'],
    stripPrefix: 'dist'
  }, callback);
});

gulp.task('files', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest("dist/"))
});

gulp.task('sitemap', function () {
  return gulp.src('dist/*.html', {
      read: false
    })
    .pipe(sitemap({
      siteUrl: 'http://badger.jrtapsell.co.uk'
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', gulp.series('files', 'make-sw', 'sitemap'));