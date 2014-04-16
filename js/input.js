var mercury = require('mercury');

module.exports = function () {
  var del = mercury.Delegator();

  return mercury.EventSinks(del.id, ['search']);
};