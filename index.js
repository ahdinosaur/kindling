require('./index.less');

if (process.env.NODE_ENV === "development") {
  document.body.innerHTML += "<script src=\"/-/live-reload.js\"></script>";
}

var Skateboard = require('skateboard');
var mercury = require('mercury');

var Input = require("./js/input.js")
var State = require("./js/state.js")
var Render = require("./js/render.js")
var Update = require("./js/update.js")

var setupSearch = function (state, events) {
  Skateboard("http://npmsearch.com", function (stream) {

    var query = {
        type: 'search',
        value: 'keywords:kindling',
        start: 0,
        perpage: 20,
    };
    stream.write(JSON.stringify(query) + '\n'); 

    stream.on('data', function(d) {
      var data = JSON.parse(d);
      console.log(data);
      state.loading.set(false);
      state.list.set(data.response.docs);
    });
  });
};

var setupEvents = function (state, events) {
  events.search(Update.search.bind(null, state));
};

var App = function () {
  var initialState = null;
  var input = Input();
  var state = State.app(input.sinks, initialState);

  setupSearch(state, input.events);
  setupEvents(state, input.events);

  var loop = mercury.main(state(), Render);

  state(loop.update);

  return loop.target;
}

var app = App();
document.getElementById('app').appendChild(app);