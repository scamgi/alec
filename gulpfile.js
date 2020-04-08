var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var sassdoc = require('sassdoc');
var browser = require('browser-sync').create();


// build

function buildDel() { return del('build'); }

function buildSass() {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'))
    .pipe(browser.stream());
}

gulp.task('build', gulp.series(buildDel, buildSass));



// docs

function docsDel() { return del('docs'); }

function docsSassdoc() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sassdoc({ dest: 'docs' }));
}

gulp.task('docs', gulp.series(docsDel, docsSassdoc));



// serve

function serve(cb) {
  browser.init({
    server: {
      baseDir: './'
    },
    open: false
  });

  gulp.watch('scss/**/*.scss', buildSass);
  gulp.watch('examples/**/*.html').on('change', browser.reload);

  cb();
}

gulp.task('serve', gulp.series(buildDel, buildSass, serve));