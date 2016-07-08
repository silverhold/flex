var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


var report_error = function(error) {
  $.notify({
    title: 'An error occured with a Gulp task',
    message: 'Check you terminal for more informations'
  }).write(error);
};

gulp.task('scss', function () {
    return gulp.src('src/scss/flex.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: true,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe($.autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dest/css'))
    .pipe($.size({title: 'css'}))
    .pipe($.cssmin())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('scss_test', function () {
    return gulp.src('test/src/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: true,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe($.autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('test/dest'));
});

