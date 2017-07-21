var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat')
    uglify		= require('gulp-uglify')
    minify		= require('gulp-minify-css');


gulp.task('default', function() {
    gulp.start('styles');
    gulp.start('scripts');
});


gulp.task('styles', function(){
    gulp.src('public/stylesheets/src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('scripts', function() {
    gulp.src([
        'public/javascripts/src/jquery.paginate.js',
        'public/javascripts/src/functions.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch',function() {
    gulp.watch('public/stylesheets/src/style.scss',['styles']);
    gulp.watch('public/javascripts/src/*.js',['scripts']);
});
