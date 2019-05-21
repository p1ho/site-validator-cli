const test = require('ava')
const isNotFound = require('../../../lib/helpers-validate-pages/is-not-found')

test('found', t => {
  t.false(isNotFound({}))
  t.false(isNotFound({ messages: [] }))
  t.false(isNotFound({ messages: [{ type: 'some-value' }] }))
})

test('not found', t => {
  t.true(isNotFound({ messages: [{ type: 'non-document-error' }] }))
})
