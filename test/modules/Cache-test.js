const test = require('ava')
const path = require('path')
const Cache = require('../../lib/Cache')
const { existsSync } = require('fs')
const cachePath = path.resolve(`${__dirname}/../../cache/test/Cache`)

test('cache file can be created', t => {
  var cache = new Cache('test', cachePath)
  cache.save(true)
  t.is(true, existsSync('cache/test/Cache/test'))
})

test("cache's key/value can be set", t => {
  var cache = new Cache('test', cachePath)
  cache.setKey('key', 'value')
  t.is(cache.getKey('key'), 'value')
  cache.save()
})

test('cache key can be removed', t => {
  var cache = new Cache('test', cachePath)
  t.is(cache.getKey('key'), 'value')
  cache.removeKey('key')
  t.is(cache.getKey('key'), undefined)
  cache.save()
})

test('cache expiration works', t => {
  var cache = new Cache('test', cachePath, 1 / 60)
  cache.setKey('key', 'value expires in 1 second')
  t.is(cache.getKey('key'), 'value expires in 1 second')
  setTimeout(() => {
    t.is(cache.getKey('key'), undefined)
  }, 1001)
})

test('cache file can be removed', t => {
  var cache = new Cache('test', cachePath)
  cache.remove()
  t.is(true, !existsSync('cache/test/Cache/test'))
})
