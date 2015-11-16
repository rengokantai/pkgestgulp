/**
 * Created by Hernan Y.Ke on 2015/11/17.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var myth = require("gulp-myth");
var imagemin = require("gulp-imagemin");
gulp.task('styles', function () {
    return gulp.src('app/css/*.css')
        .pipe(concat('all.css')).pipe(myth()).pipe(gulp.dest('dist/'));
});


gulp.task('scripts', function () {
    return gulp.src('app/js/*.js').pipe(jshint()).pipe(jshint.reporter('default')).pipe(uglify('all.js')).pipe(uglify()).pipe(gulp.dest('dist/'))
})

gulp.task('images',function(){
    return gulp.src('app/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function () {
    gulp.watch('app/css/*.css', 'styles');
    gulp.watch('app/js/*.js', 'scripts');
    gulp.watch('app/img/*', 'images');
})


gulp.task('default', gulp.parallel('images', 'scripts', 'styles','watch'));