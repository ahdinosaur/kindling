/**
 * Runs "make generator" using a child process.
 *
 * @package kindling
 * @author Andrew Sliwinski <andrew@diy.org>
 * @author Michael Williams <dinosaur@riseup.net>
 */

/**
 * Dependencies
 */
var child = require('child_process');

/**
 * Export
 */
module.exports = function (path, callback) {
    var exec = child.exec('make generator', {cwd: path});

    exec.on('exit', function (code, signal) {
        if (code !== 0) return callback(signal);
        callback(null);
    });

    exec.on('error', callback);
    exec.stdout.pipe(process.stdout);
};