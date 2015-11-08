/**
 * Created by Hernan Y.Ke on 2015/11/17.
 */
var gulp= require("gulp");
var concat= require("gulp-concat");
var uglify= require("gulp-uglify");
var myth= require("gulp-myth");

gulp.task('styles',function(){
    return gulp.src('app/css/*.css')
        .pipe(concat('all.css')).pipe(myth()).pipe(gulp.dest('dist/'));
});


gulp.task('scripts',function(){
    return gulp.src('app/js/*.js').pipe(uglify('all.js')).pipe(uglify()).pipe(gulp.dest('dist/'))
})

gulp.task('watch',function(){
    gulp.watch('app/css/*.css',styles);
    gulp.watch('app/js/*.js',scripts);
})


gulp.task('default',gulp.parallel('watch','scripts','styles'));