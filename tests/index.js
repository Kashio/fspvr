/**
 * Created by Roy on 02/04/2016.
 */

// npm modules
/*eslint-disable no-unused-vars*/
var should          = require('chai').should(),
/*eslint-enable no-unused-vars*/
	mockery         = require('mockery');

// lib modules
var fspvr           = require('../index');

var reformatPath    = fspvr.reformatPath,
	reformatSegment = fspvr.reformatSegment,
	isPathValid     = fspvr.isPathValid,
	isSegmentValid  = fspvr.isSegmentValid;

mockery.registerAllowable('../index');

var linuxOsMock = {
	type: function () {
		return "Linux";
	}
};

var windowsOsMock = {
	type: function () {
		return "Windows_NT";
	}
};
describe('#fspvr', function() {
	before(function() {
		mockery.enable({
			warnOnReplace: false
		});
	});
	after(function() {
		mockery.disable();
	});
	describe('#windows', function() {
		before(function() {
			mockery.registerMock('os', windowsOsMock);
			fspvr = require('../index');
			console.log('os is : ', require('os').type());
		});
		describe('#reformat path', function() {
			it('path with illegal names', function() {
				reformatPath('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
						'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\LPT9\\C\\file.txt').should.equal('C:\\A\\B\\C\\file.txt');
			});
			it('path segment with invalid characters', function() {
				reformatSegment('>M<y?\\ D,irec*to|ry"').should.equal('My Directory');
			});
			it('path segment with invalid trailing characters', function() {
				reformatSegment('file..    ..').should.equal('file');
			});
		});
		describe('#validate path', function() {
			it('path with device names', function() {
				isPathValid('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
						'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\C\\LPT9\\file.txt').should.equal(false);
			});
			it('path segment with invalid characters', function() {
				isSegmentValid('>M<y?\\ D,irec*to|ry"').should.equal(false);
			});
			it('path segment with invalid trailing characters', function() {
				isSegmentValid('file..    ..').should.equal(false);
			});
		});
	});
	describe('#linux & darwin', function() {
		before(function() {
			mockery.registerMock('os', linuxOsMock);
			fspvr = require('../index');
		});
		describe('#reformat path', function() {
			it('path segment with invalid characters', function() {
				reformatSegment('foo/bar').should.equal('foobar');
			});
		});
		describe('#validate path', function() {
			it('validate darwin and linux path segment with invalid characters', function() {
				isSegmentValid('foo/bar').should.equal(false);
			});
		});
	});
});