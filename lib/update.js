var State = require('./state');

var search = function (state, query) {
  state.search.set(query || "");
};

module.exports = {
  search: search,
};