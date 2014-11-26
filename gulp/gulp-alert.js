/**
 * This is an example gulp plugin. It does something completely useless; appending a javascript alert
 *
 * This plugin is written using the Node.JS stream interfaces to demonstrate, without distraction,
 * how Gulp plugins use Node streams. However, in practice you would probably want to use the through2 module,
 * which is a simple wrapper around Node transform streams (https://github.com/rvagg/through2).
 *
 * See here (https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md) for a similar
 * example that uses through2
 *
 * @type {exports}
 */
var util = require('util');
var stream = require('stream');
var StreamQueue = require('streamqueue');

/**
 * Construct a new AlertStream
 * @param opt
 * @constructor
 */
function AlertStream(opt) {

    //call the super constructor, the stream must be in object mode
    stream.Transform.call(
        this,
        {
            objectMode: true
        }
    );

    //this is the message to alert
    this.message = opt;
}

//extends Transform Stream
util.inherits(AlertStream, stream.Transform);

module.exports = function(opt) {
    return new AlertStream(opt);
};

/**
 * Overrides the _transform function
 * @param file
 * @param encoding
 * @param callback
 * @private
 */
AlertStream.prototype._transform = function(file, encoding, callback) {

    var toAppend = new Buffer('alert(\'' + this.message + '\');');

    //is the file a stream
    if (file.isStream()) {
        //create a readable stream which streams the text to append
        var appendStream = new stream.Readable();
        appendStream.push(toAppend);
        appendStream.push(null);
        //merge the streams using streamqueue
        file.contents = new StreamQueue(
            file.contents,
            appendStream
        );

    //is the file buffered?
    } else if (file.isBuffer()) {
        file.contents = Buffer.concat([toAppend, file.contents]);
    }

    this.push(file);
    callback();
};