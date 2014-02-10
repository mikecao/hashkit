var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');
 
// Lint JS
gulp.task('lint', function() {
    gulp.src('hashkit.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
// Concat & Minify JS
gulp.task('minify', function(){
    gulp.src('hashkit.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});
 
// Default
gulp.task('default', ['lint', 'minify']);
