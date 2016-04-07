/**
 * Created by Roy on 02/04/2016.
 */

// npm modules
/*eslint-disable no-unused-vars*/
var should          = require('chai').should();
/*eslint-enable no-unused-vars*/

// lib modules
var fspvr           = require('../index');

var reformatPath    = fspvr.reformatPath,
	reformatSegment = fspvr.reformatSegment,
	isPathValid     = fspvr.isPathValid,
	isSegmentValid  = fspvr.isSegmentValid;

describe('#reformat path', function() {
	it('reformat windows path with device names', function() {
		reformatPath('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
			'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\LPT9\\C\\file.txt').should.equal('C:\\A\\B\\C\\file.txt');
	});
	it('reformat windows path segment with invalid characters', function() {
		reformatSegment('>M<y?\\ D,irec*to|ry"').should.equal('My Directory');
	});
	it('reformat windows path segment with the invalid leading characters', function() {
		reformatSegment('file..    ..').should.equal('file');
	});
});

describe('#validate path', function() {
	it('validate windows path with device names', function() {
		isPathValid('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
			'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\C\\LPT9\\file.txt').should.equal(false);
	});
	it('validate windows path segment with invalid characters', function() {
		isSegmentValid('>M<y?\\ D,irec*to|ry"').should.equal(false);
	});
	it('reformat windows path segment with the invalid leading characters', function() {
		isSegmentValid('file..    ..').should.equal(false);
	});
});