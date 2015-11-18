var $ = require('jquery')
var gulp = require('gulp')
var mocha = require('gulp-mocha')
var webpack = require('gulp-webpack')
var ghpages = require('gh-pages')
var path = require('path')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')

gulp.task('default', ['build'])

gulp.task('build', ['build:html', 'build:js', 'build:images', 'sass'])

gulp.task('test', function() {
  // return gulp.src('./test/*.js', {read: false})
  //   .pipe(mocha())
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

gulp.task('build:images', function() {
  return gulp
    .src('./src/images/*.png')
    .pipe(gulp.dest('./build/images/'))
})

// gulp.task('build:css', function() {
//   return gulp
//     .src('./src/**/*.css')
//     .pipe(gulp.dest('./build'))
// })

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/**/*.html', ['build:html'])
    gulp.watch('./src/sass/*.scss', ['sass'])
    gulp.watch('./src/**/*.js', ['build:js'])
    gulp.watch('./test/*.js', ['test'])
})

gulp.task('gh-pages', function() {
  ghpages.publish(path.join(__dirname, 'build'), function(err) {
    if (!err) { console.log('Successfully deployed at http://billyzac.github.io/seismic/!')}
    else { console.log('Error:', err) }
  });
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
    gulp.watch("./build/**/*").on('change', browserSync.reload)
})

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})
