/**
 * Created by Roy on 02/04/2016.
 */

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('run-tests', function () {
    return gulp.src('tests/index.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});