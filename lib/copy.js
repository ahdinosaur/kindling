/**
 * Creates a copy of the specified template in the current working directory.
 *
 * @package kindling
 * @author Andrew Sliwinski <andrew@diy.org>
 * @author Michael Williams <dinosaur@riseup.net>
 */

/**
 * Dependencies
 */
var extra   = require('fs-extra'),
    fs      = require('fs');

/**
 * Export
 *
 * @param {String} Template name
 * @param {String} Destination name
 *
 * @return {String} Replica path
 */
module.exports = function (template, name, callback) {
    // Absolute paths to source & destination
    var source      = process.env.HOME + '/.kindling/node_modules/kindling-' + template + '/template';
    var destination = process.cwd() + '/' + name;

    // Checks
    if (!fs.existsSync(source)) return callback('Template not found.');
    if (fs.existsSync(destination)) return callback('Path already exists.');

    // Copy
    extra.copy(source, destination, function (err) {
        callback(err, destination);
    });
};