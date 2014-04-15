var mercury = require('mercury');
var extend = require('xtend');

var App = {
  list: [],
  search: "",
  loading: true,
};

var app = function (sinks, initialState) {
  var state = extend(App, initialState);

  return mercury.hash({
    list: mercury.array(state.list),
    search: mercury.value(state.search),
    loading: mercury.value(state.loading),
    sinks: sinks,
  });
};

module.exports = {
  app: app,
};