/**
 * Loads the default templates for the current user.
 *
 * @package kindling
 * @author Andrew Sliwinski <andrew@diy.org>
 * @author Michael Williams <dinosaur@riseup.net>
 */

/**
 * Dependencies
 */
var colors  = require('colors'),
    extra   = require('fs-extra'),
    fs      = require('fs'),
    npm     = require('npm');

/**
 * Export
 */
module.exports = function (template, callback) {
    var pkg = "kindling-" + template;

    npm.load(function (err, npm) {
      if (err) { throw err; }

      // set prefix to be in kindling dir
      npm.prefix = __dirname + '/../';

      npm.commands.install([pkg], callback);
    });
};