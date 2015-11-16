var gulp = require('gulp')
var mocha = require('gulp-mocha')

gulp.task('default', ['test', 'build html', 'build js', 'build css'], function() {
})

gulp.task('test', function() {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha())
})

gulp.task('build html', function() {
  return gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build js', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(gulp.dest('./build'))
})

gulp.task('build css', function() {
  return gulp
    .src('./src/**/*.css')
    .pipe(gulp.dest('./build'))
})
