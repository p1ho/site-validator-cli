const test = require('ava')
const getOption = require('../../lib/get-option')

test('test empty option returns false', t => {
  t.false(getOption([], {}))
  t.false(getOption(['key'], {}))
})

test('test option parsing', t => {
  var argv
  argv = { key: true }
  t.true(getOption(['key'], argv))
  t.true(getOption(['key1', 'key'], argv))

  argv = { key1: true, key2: false }
  t.true(getOption(['key1', 'key2'], argv))
  t.false(getOption(['key2', 'key1'], argv))

  argv = { key1: 'value1', key2: 'value2' }
  t.true(getOption(['key1', 'key2'], argv) === 'value1')
  t.true(getOption(['key2', 'key1'], argv) === 'value2')
})
