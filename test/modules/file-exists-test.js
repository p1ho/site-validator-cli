const test = require('ava')
const fileExists = require('../../lib/file-exists')

test('it returns true if file exists', t => {
  t.is(true, fileExists('test/data/urls.txt'))
})

test('it returns false if file does not exists', t => {
  t.is(false, fileExists('test/data/does-not exist.txt'))
})
