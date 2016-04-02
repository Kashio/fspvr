/**
 * Created by Roy on 02/04/2016.
 */

// core modules
var path = require('path');

module.exports = {
    /**
     * Reformat fs path to be valid.
     *
     * @param  {String} fsPath
     * @return {String}
     */
    reformatPath: function(fsPath) {
        if (!_.isString(fsPath)) {
            throw new TypeError('path must be of type string');
        }
        var segments = fsPath.substring(fsPath.indexOf(path.sep) + 1).split(path.sep);
        for(var i = 0; i < segments.length; i++) {
            fsPath = fsPath.replace(segments[i], makeValidFsObjectName(segments[i]));
        }
        return fsPath;
    },
    /**
     * Reformat fs segment to be valid.
     *
     * @param  {String} segment
     * @return {String}
     */
    reformatSegment: function(segment) {
        if (!_.isString(segment)) {
            throw new TypeError('segment must be of type string');
        }
        segment = segment
            .replace(/[/?<>\\,:*|"]/g, '')
            .replace(/CON|PRN|AUX|CLOCK\$|NUL|COM[1-9]|LPT[1-9]/ig, 'DEVICE_NAME');
        var invalidTrailingCharactersRegex = /(?:[.\s]+)$/;
        while (invalidTrailingCharactersRegex.test(segment)) {
            segment = segment.replace(invalidTrailingCharactersRegex, '');
        }
        return segment;
    },
    /**
     * Checks if fs path is valid.
     *
     * @param  {String} fsPath
     * @return {String}
     */
    isPathValid: function(fsPath) {
        if (!_.isString(fsPath)) {
            throw new TypeError('path must be of type string');
        }
        return fsPath === reformatPath(fsPath);
    },
    /**
     * Checks if fs segment is valid.
     *
     * @param  {String} segment
     * @return {String}
     */
    isSegmentValid: function(segment) {
        if (!_.isString(segment)) {
            throw new TypeError('segment must be of type string');
        }
        return segment === reformatSegment(segment);
    }
};