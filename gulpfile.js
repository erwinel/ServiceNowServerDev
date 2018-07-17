var gulp = require('gulp');
var del = require('del');
var util = require('util');
var jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');
var ts = require("gulp-typescript");
var changed = require('gulp-changed');

var scopedAppsTsProject = ts.createProject("./src/scoped/tsconfig.json");
var globallyScopedTsProject = ts.createProject("./src/global/tsconfig.json");

gulp.task('clean-scoped-apps', function() { return del([scopedAppsTsProject.options.outDir]); });

gulp.task('clean-sn-global', function() { return del([globallyScopedTsProject.options.outDir]); });

gulp.task('clean-scoped-apps-test', function() { return del([utilApplicationTestTsProject.options.outDir]); });

gulp.task('clean-all', ['clean-scoped-apps', 'clean-sn-global']);

gulp.task('build-all', ['build-scoped-apps', 'build-sn-global']);

gulp.task('rebuild-all', ['rebuild-scoped-apps', 'rebuild-sn-global']);

gulp.task('build-scoped-apps', function() {
    return scopedAppsTsProject.src()
        .pipe(scopedAppsTsProject())
        .pipe(gulp.dest(scopedAppsTsProject.options.outDir));
});

gulp.task('rebuild-scoped-apps', ['clean-scoped-apps'], function() {
    return scopedAppsTsProject.src()
        .pipe(scopedAppsTsProject())
        .pipe(gulp.dest(scopedAppsTsProject.options.outDir));
});

gulp.task('build-sn-global', function() {
    return globallyScopedTsProject.src()
        .pipe(globallyScopedTsProject())
        .pipe(gulp.dest(globallyScopedTsProject.options.outDir));
});

gulp.task('rebuild-sn-global', ['clean-sn-global'], function() {
    return globallyScopedTsProject.src()
        .pipe(globallyScopedTsProject())
        .pipe(gulp.dest(globallyScopedTsProject.options.outDir));
});

//gulp.task('run-scoped-apps-tests', function() {
//    return gulp.src(['test/applications/**/+(test.js|test-)*.js'])
//      .pipe(jasmine());
//});