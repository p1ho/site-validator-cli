const test = require('ava')
const getHelpText = require('../../../lib/console-texts/get-help-text')

test('check return type is string', t => {
  t.true(typeof getHelpText() === 'string')
})
