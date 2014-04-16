var State = require('./state');

var search = function (state, input) {
  state.search.set(input.search || "");
};

module.exports = {
  search: search,
};