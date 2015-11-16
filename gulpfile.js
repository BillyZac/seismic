var gulp = require('gulp')
var mocha = require('gulp-mocha')

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
    .src('./src/**/*.js')
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
