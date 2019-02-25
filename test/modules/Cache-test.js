const test = require('ava')
const path = require('path')
const Cache = require('../../lib/Cache')
const fileExists = require('../../lib/file-exists')
const cachePath = path.resolve('./cache/test')

test('it returns true if cache has been successfully created', t => {
  var cache = new Cache('test', cachePath)
  cache.save(true)
  t.is(true, fileExists('cache/test/test'))
})

test('it returns true if key/value is set successfully', t => {
  var cache = new Cache('test', cachePath)
  cache.setKey('key', 'value')
  t.is(true, cache.getKey('key') === 'value')
  cache.save()
})

test('it returns true if key is removed successfully', t => {
  var cache = new Cache('test', cachePath)
  t.is(true, cache.getKey('key') === 'value')
  cache.removeKey('key')
  t.is(true, cache.getKey('key') === undefined)
  cache.save()
})

test('it returns true if expiration works', t => {
  var cache = new Cache('test', cachePath, 1 / 60)
  cache.setKey('key', 'value expires in 1 second')
  t.is(true, cache.getKey('key') === 'value expires in 1 second')
  setTimeout(() => {
    t.is(true, cache.getKey('key') === undefined)
  }, 1001)
})

test('it returns true if cache has been removed', t => {
  var cache = new Cache('test', cachePath)
  cache.remove()
  t.is(true, !fileExists('cache/test/test'))
})
