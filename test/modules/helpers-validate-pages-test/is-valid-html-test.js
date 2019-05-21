const test = require('ava')
const isValidHtml = require('../../../lib/helpers-validate-pages/is-valid-html')

test('result is valid html', t => {
  t.true(isValidHtml({
    messages: []
  }, false))
})

test('result is not valid html', t => {
  t.false(isValidHtml({
    messages: [
      {}
    ]
  }, false))

  t.false(isValidHtml({
    messages: [
      { type: 'error' }
    ]
  }, false))
})

test('quiet mode: result is valid html', t => {
  t.true(isValidHtml({
    messages: [
      { type: 'info' }
    ]
  }, true))

  t.true(isValidHtml({
    messages: [
      { type: 'non-document-error' }
    ]
  }, true))

  t.true(isValidHtml({
    messages: [
      { type: 'info' },
      { type: 'non-document-error' },
      { type: 'random-error' },
      {}
    ]
  }, true))
})

test('quiet mode: result is not valid html', t => {
  t.false(isValidHtml({
    messages: [
      { type: 'error' }
    ]
  }, true))

  t.false(isValidHtml({
    messages: [
      { type: 'error' },
      { type: 'non-document-error' }
    ]
  }, true))

  t.false(isValidHtml({
    messages: [
      { type: 'error' },
      { type: 'non-document-error' },
      { type: 'error' },
      { type: 'info' },
      { type: 'error' }
    ]
  }, true))
})
