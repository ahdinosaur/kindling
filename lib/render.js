var mercury = require('mercury');
var h = mercury.h;

var filter = require('./filter');
var spinner = require('./spinner')();

var render = function (state) {
  return h(".app", [
    mercury.partial(renderSearch, state.search, state.sinks),
    mercury.partial(renderLoading, state.loading),
    mercury.partial(renderList, state, state.sinks),
  ]);
};

var renderSearch = function (search, sinks) {
  return h("input.search", {
    type: "text",
    placeholder: "enter search here",
    value: search,
    name: "search",
    "data-event": mercury.changeEvent(sinks.search), 
  });
};

var renderLoading = function (loading) {
  if (loading) {
    return h(".loading", [spinner]);
  } else {
    return h(".not.loading", []);
  }
};

var renderList = function (state, sinks) {
  return h(".modules",
    filter.modules(state.list, state.search)
    .map(function (item) {
      return mercury.partial(renderItem, item, sinks);
    })
  );
};

var renderItem = function (item, sinks) {
  return h(".module", [
    h("p", item.name + " by " + item.author),
  ]);
};

module.exports = render;