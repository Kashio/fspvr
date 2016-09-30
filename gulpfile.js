/**
 * Created by Roy on 02/04/2016.
 */

// npm modules
var gulp  = require('gulp'),
	mocha = require('gulp-mocha');

gulp.task('run-tests', function () {
	return gulp.src('test/*.spec.js', {read: false})
		.pipe(mocha({reporter: 'spec'}));
});