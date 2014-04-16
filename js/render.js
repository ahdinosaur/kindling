var mercury = require('mercury');
var h = mercury.h;

var filter = require('./filter');
var spinner = require('./spinner')();

var render = function (state) {
  return h(".app", [
    h("h2", "Generators"),
    mercury.partial(renderSearch, state.search, state.sinks),
    mercury.partial(renderLoading, state.loading),
    mercury.partial(renderList, state, state.sinks),
  ]);
};

var renderSearch = function (search, sinks) {
  return h(".ui.large.fluid.icon.input", [
    h("input.search", {
      type: "text",
      placeholder: "Search",
      value: search,
      name: "search",
      "data-event": mercury.changeEvent(sinks.search), 
    }),
    h("i.search.icon"),
  ]);
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
    h("h3", [
      h("a", {
        href: item.homepage ||
          ("https://npmjs.org/package/" + item.name),
      },
      item.name),
    ]),
    h("h4", "by " + item.author),
    h("p", item.description),
    h(".keywords", item.keywords.map(function (kw) {
      return h(".ui.label", kw);
    })),
  ]);
};

module.exports = render;