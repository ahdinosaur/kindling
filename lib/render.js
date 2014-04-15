var mercury = require('mercury');
var h = mercury.h;

var render = function (state) {
  return h(".modules", [
    mercury.partial(renderSearch, state.search, state.sinks),
    mercury.partial(renderList, state.list, state.sinks),
  ]);
};

var renderSearch = function (search, sinks) {
  return h("input#search.search", {
    type: "text",
    placeholder: "enter search here",
    value: search,
    name: "search",
  });
};

var renderList = function (list, sinks) {
  return h("#list.list",
    list.map(function (item) {
      return mercury.partial(renderItem, item, sinks);
    })
  );
};

var renderItem = function (item, sinks) {
  return h(".item", [
    h("p", item.name + " by " + item.author),
  ]);
};

module.exports = render;