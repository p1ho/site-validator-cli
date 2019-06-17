const test = require('ava')
const fs = require('fs')
const Cache = require('../../lib/Cache')
const clearCache = require('../../lib/clear-cache')
const path = require('path')

test('test cache clearing', t => {
  var subfolder = 'test-clear-1'
  var cache = new Cache('test-clear-cache', path.resolve(`${__dirname}/../../cache/${subfolder}`))
  cache.save(true)
  clearCache(subfolder)
  t.true(fs.readdirSync(path.resolve(`${__dirname}/../../cache/${subfolder}`)).length === 0)
})

test('test cache clearing on a different folder', t => {
  var subfolder = 'test-clear-2'
  var cache = new Cache('test-clear-cache', path.resolve(`${__dirname}/../../cache/${subfolder}`))
  cache.save(true)
  clearCache(subfolder)
  t.true(fs.readdirSync(path.resolve(`${__dirname}/../../cache/${subfolder}`)).length === 0)
})
