var h = require('mercury').h;

var Bar = function (i) {

  var style = {};
  style["-webkit-animation-delay"] = style["animation-delay"] =
    ((i - 12) / 10) + 's';
  style["-webkit-transform"] = style["transform"] = 
    'rotate(' + (i * 30) + 'deg) translate(9.5px);';

  return h(".bar", {
    style: style,
  });
};

module.exports = function () {

  var bars = [];
  for (var i = 0; i < 12; i++) {
    bars.push(Bar(i));
  };

  return h(".spinner", bars);
};