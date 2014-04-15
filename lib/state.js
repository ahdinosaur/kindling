var mercury = require('mercury');
var cuid = require('cuid');
var extend = require('xtend');

var App = {
  list: [],
  search: "",
};

var Item = {
  id: null,
  name: "",
  author: "",
};

var app = function (sinks, initialState) {
  var state = extend(App, initialState);

  return mercury.hash({
    list: mercury.array(state.list),
    search: mercury.value(state.search),
  });
};

var item = function (item) {
  var state = extend(Item, item);

  return mercury.hash({
    id: cuid(),
    name: mercury.value(state.name),
    author: mercury.value(state.author),
  });
};

module.exports = {
  app: app,
  item: item,
};