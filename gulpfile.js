const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const purgecss = require('gulp-purgecss');

gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('purgecss', () => {
  return gulp.src('css/**/*.css')
      .pipe(purgecss({
          content: ['../clubster-app/src/**/*.html'],
          safelist: [
            'h1', 'h2', 'h3'
          ]
      }))
      .pipe(gulp.dest('output'))
});

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles', 'purgecss'])(done);
    });
});

gulp.task('default', gulp.series(['clean', 'styles', 'purgecss']));


