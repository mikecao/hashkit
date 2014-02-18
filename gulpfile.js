var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
 
gulp.task('lint', function() {
    gulp.src('hashkit.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
gulp.task('minify', function(){
    gulp.src('hashkit.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.'));
});
 
gulp.task('default', ['lint', 'minify']);
