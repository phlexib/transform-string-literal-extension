 /*jshint esversion: 6 */

const gulp = require('gulp');
const parcel = require ('gulp-parcel')
const pkg = require('./package.json');
const del = require('del');

gulp.task("clean", function(){
  return del(['./dist','./.temp']);
});

gulp.task("parcelIt",["clean"],function(){
  return gulp.src("src/extension.js")
    .pipe(parcel())
    .pipe(gulp.dest('dist'))
})

gulp.task("build", ["parcelIt","copyFiles"] ,function(){
  return gulp.src("dist/*.js")
    .pipe(gulp.dest("dist/src"));
  });

gulp.task ('copyFiles', function(){
  gulp.src(['./package.json','./README.md'])
    .pipe(gulp.dest('dist'));
}

);

gulp.task("default", ["build"]);
