/**
 * Created by Hernan Y.Ke on 2015/11/17.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var myth = require("gulp-myth");
var imagemin = require("gulp-imagemin");
var plumber = require("gulp-plumber");
var connect = require("connect");
var serve = require("serve-static");
var browsersync = require("browser-sync");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var beeper = require("beeper");
var del  = require("del");

function onError(err){
    beeper();
    console.log(err);
}

gulp.task('styles', function () {
    return gulp.src('app/css/*.css')
        .pipe(plumber({
            errorHandler:onError
        })).pipe(concat('all.css')).pipe(myth()).pipe(gulp.dest('dist/'));
});


gulp.task('scripts', function () {
    return gulp.src('app/js/*.js').pipe(jshint()).pipe(jshint.reporter('default')).pipe(uglify('all.js')).pipe(uglify()).pipe(gulp.dest('dist/'))
});

gulp.task('images',function(){
    return gulp.src('app/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'))
});


gulp.task('server',function(){
    return connect().use(serve(__dirname)).listen(8080).on('listening',function(){
        console.log('Server at 8080');
    })
});

gulp.task('browsersync',function(cb){
    return browsersync({
        server:{
            baseDir: './'
        }
    },cb);
});

gulp.task('watch', function () {
    gulp.watch('app/css/*.css', gulp.series('clean','styles',browsersync.reload));
    gulp.watch('app/js/*.js',  gulp.series('clean','scripts',browsersync.reload));
    gulp.watch('app/img/*', gulp.series('clean','images',browsersync.reload));
});

gulp.task('browserify',function(){
    return browserify('./app/js/app.js').bundle().pipe(source('bundle.js')).pipe(gulp.dest('dist'));
});

gulp.task('clean',function(cb){
    return del(['dist/*','!dist/site.css'],cb); //Do not delete dist/site.css
});



gulp.task('default', gulp.parallel('images', 'scripts', 'styles','server','browsersync','watch'));