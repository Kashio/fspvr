/**
 * Created by Roy on 02/04/2016.
 */

// core modules
var util = require('util'),
	path = require('path'),
	os   = require('os');

// npm modules
var _    = require('underscore');

var osType = os.type();

var illegalCharacters;
var illegalTrailingCharacters;
var illegalNames;

if (osType === "Linux" || osType === "Darwin") {
	illegalCharacters = /\//g;
} else {
	illegalCharacters = /[/?<>\\,:*|"]/g;
	illegalTrailingCharacters = /(?:[.\s]+)$/;
	illegalNames = /^CON|PRN|AUX|CLOCK\$|NUL|COM[1-9]|LPT[1-9]$/ig;
}

module.exports = {
    /**
     * Reformat fs segment to be valid
     *
     * @param  {String} segment
     * @param  {Boolean=true} strict
     * @return {String}
     */
	reformatSegment: function(segment, strict) {
		if (!_.isString(segment)) {
			throw new TypeError('segment must be of type string');
		}
		if (!_.isBoolean(strict)) {
			strict = true;
		}
		segment = segment.replace(illegalCharacters, '');
		if (strict && osType === "Windows_NT") {
			segment = segment.replace(illegalNames, '');
			while (illegalTrailingCharacters.test(segment)) {
				segment = segment.replace(illegalTrailingCharacters, '');
			}
		}
		return segment;
	},
    /**
     * Reformat fs path to be valid
     *
     * @param  {String} fsPath
     * @param  {Boolean=true} strict
     * @return {String}
     */
	reformatPath: function(fsPath, strict) {
		if (!_.isString(fsPath)) {
			throw new TypeError('path must be of type string');
		}
		var segments = _.filter(fsPath.substring(fsPath.indexOf(path.sep) + 1).split(path.sep), function(segment) {
			return segment !== '';
		});
		for (var i = 0; i < segments.length; i++) {
			var replaceWith = module.exports.reformatSegment(segments[i], strict);
			var find = util.format('%s%s', replaceWith === '' ? path.sep : '', segments[i]);
			fsPath = fsPath.replace(find, replaceWith);
		}
		return fsPath;
	},
    /**
     * Checks if fs path is valid
     *
     * @param  {String} fsPath
     * @param  {Boolean=true} strict
     * @return {Boolean}
     */
	isPathValid: function(fsPath, strict) {
		if (!_.isString(fsPath)) {
			throw new TypeError('path must be of type string');
		}
		return fsPath === module.exports.reformatPath(fsPath, strict);
	},
    /**
     * Checks if fs segment is valid
     *
     * @param  {String} segment
     * @param  {Boolean=true} strict
     * @return {Boolean}
     */
	isSegmentValid: function(segment, strict) {
		if (!_.isString(segment)) {
			throw new TypeError('segment must be of type string');
		}
		return segment === module.exports.reformatSegment(segment, strict);
	}
};