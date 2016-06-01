/**
 * Created by Roy on 02/04/2016.
 */

// npm modules
/*eslint-disable no-unused-vars*/
var should          = require('chai').should(),
/*eslint-enable no-unused-vars*/
	mockery         = require('mockery'),
	reload          = require("require-reload")(require);

mockery.registerAllowables(['util', 'underscore']);

var linuxPathMock = {
	sep: '/'
};

var windowsPathMock = {
	sep: '\\'
};

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
	describe('windows', function() {
		var fspvr;
		before(function() {
			mockery.registerMock('path', windowsPathMock);
			mockery.registerMock('os', windowsOsMock);
			fspvr = reload('../index');
		});
		after(function() {
			mockery.deregisterMock(windowsPathMock);
			mockery.deregisterMock(windowsOsMock);
		});
		describe('reformat', function() {
			it('path with illegal names', function() {
				fspvr.reformatPath('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
						'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\LPT9\\C\\file.txt').should.equal('C:\\A\\B\\C\\file.txt');
			});
			it('path segment with invalid characters', function() {
				fspvr.reformatSegment('>M<y?\\ D,irec*to|ry"').should.equal('My Directory');
			});
			it('path segment with invalid trailing characters', function() {
				fspvr.reformatSegment('file..    ..').should.equal('file');
			});
		});
		describe('validate', function() {
			it('path with device names', function() {
				fspvr.isPathValid('C:\\A\\CON\\B\\PRN\\AUX\\CLOCK$\\NUL\\COM1\\COM2\\COM3\\COM4\\COM5\\COM6\\COM7\\COM8\\COM9' +
						'\\LPT1\\LPT2\\LPT3\\LPT4\\LPT5\\LPT6\\LPT7\\LPT8\\C\\LPT9\\file.txt').should.equal(false);
			});
			it('path segment with invalid characters', function() {
				fspvr.isSegmentValid('>M<y?\\ D,irec*to|ry"').should.equal(false);
			});
			it('path segment with invalid trailing characters', function() {
				fspvr.isSegmentValid('file..    ..').should.equal(false);
			});
		});
	});
	describe('#linux & darwin', function() {
		var fspvr;
		before(function() {
			mockery.registerMock('path', linuxPathMock);
			mockery.registerMock('os', linuxOsMock);
			fspvr = reload('../index');
		});
		after(function() {
			mockery.deregisterMock(linuxPathMock);
			mockery.deregisterMock(linuxOsMock);
		});
		describe('reformat', function() {
			it('path segment with invalid characters', function() {
				fspvr.reformatSegment('foo/bar').should.equal('foobar');
			});
		});
		describe('validate', function() {
			it('validate darwin and linux path segment with invalid characters', function() {
				fspvr.isSegmentValid('foo/bar').should.equal(false);
			});
		});
	});
});