var gulp = require('gulp')
var mocha = require('gulp-mocha')
var webpack = require('gulp-webpack')
var ghpages = require('gh-pages');
var path = require('path');

gulp.task('default', ['build'])

gulp.task('build', ['build:html', 'build:js', 'build:css'])

gulp.task('test', function() {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha())
})

gulp.task('build:html', function() {
  return gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build:js', ['test'], function() {
  return gulp
    .src('./src/js/main.js')
    .pipe(webpack(
      { output: { filename: './js/main.js' },
        devtool: '#source-map'
      }))
    .pipe(gulp.dest('./build'))
})

gulp.task('build:css', function() {
  return gulp
    .src('./src/**/*.css')
    .pipe(gulp.dest('./build'))
})

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/**/*.html', ['build:html'])
    gulp.watch('./src/**/*.css', ['build:css'])
    gulp.watch('./src/**/*.js', ['build:js'])
    gulp.watch('./test/*.js', ['test'])
})

gulp.task('gh-pages', function() {
  ghpages.publish(path.join(__dirname, 'build'), function(err) {
    if (!err) { console.log('Successfully deployed at http://billyzac.github.io/seismic/!')}
    else { console.log('Error:', err) }
  });
})
