var gulp = require('gulp');
var del = require('del');
var util = require('util');
var jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');
var ts = require("gulp-typescript");
var changed = require('gulp-changed');

var tsUtilProject = ts.createProject("tsconfig.json");
var tsTestProject = ts.createProject("tsconfig-test.json");

gulp.task('cleanUtil', function() { return del([tsUtilProject.config.compilerOptions.outDir]); });

gulp.task('cleanTest', function() { return del([tsTestProject.config.compilerOptions.outDir]); });

gulp.task('cleanAll', ['cleanUtil', 'cleanTest']);

gulp.task('buildUtil', function() {
    return tsUtilProject.src()
        .pipe(tsUtilProject())
        .pipe(gulp.dest(tsUtilProject.config.compilerOptions.outDir));
});

gulp.task('rebuildUtil', ['cleanUtil'], function() {
    return tsUtilProject.src()
        .pipe(tsUtilProject())
        .pipe(gulp.dest(tsUtilProject.config.compilerOptions.outDir));
});

gulp.task('buildTest', function() {
    return tsTestProject.src()
        .pipe(tsTestProject())
        .pipe(gulp.dest(tsTestProject.config.compilerOptions.outDir));
});

gulp.task('rebuildTest', ['cleanTest'], function() {
    return tsTestProject.src()
        .pipe(tsTestProject())
        .pipe(gulp.dest(tsTestProject.config.compilerOptions.outDir));
});

gulp.task('buildAll', ['buildUtil', 'buildTest']);

gulp.task('rebuildAll', ['rebuildUtil', 'rebuildTest']);

gulp.task('runTests', function() {
    return gulp.src(['test/**/+(test.js|test-)*.js'])
      .pipe(jasmine());
});