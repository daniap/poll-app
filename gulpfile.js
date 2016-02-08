/**
 * Created by dainis on 08/02/16.
 */

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    lessPluginMin = require('less-plugin-clean-css'),
    lessPluginPrefix = require('less-plugin-autoprefix'),
    cleancss = new lessPluginMin({ advanced: true }),
    autoprefix = new lessPluginPrefix({ advanced: true });




gulp.task('jshint', function() {
    return gulp.src('client/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('client/public/js/'));
});

gulp.task('compl-less', function() {
    return gulp.src('client/less/**/*.less')
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('client/public/css/'));
});

gulp.task('watch', function() {
    gulp.watch('client/js/**/*.js', ['jshint']);
    gulp.watch('client/less/**/*.less', ['compl-less']);
});

gulp.task('develop', function () {
    nodemon({
        script: './app.js',
        env: { 'NODE_ENV': 'development' },
        ignore: ['client/public/js/', 'client/public/css/']
    })
    .on('start', ['watch']);
});