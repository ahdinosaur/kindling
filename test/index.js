const test = require('tape')

const kindling = require('../')

test('kindling', function (t) {
  t.ok(kindling, 'module is require-able')
  t.end()
})
