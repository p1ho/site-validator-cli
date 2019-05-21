const test = require('ava')
const fs = require('fs')
const Cache = require('../../lib/Cache')
const clearCache = require('../../lib/clear-cache')
const path = require('path')

test('(warning: this test clears cache folder) test cache clearing', t => {
  var cache = new Cache('test-clear-cache', path.resolve(`${__dirname}/../../cache/test`))
  cache.save(true)

  clearCache()

  t.true(fs.readdirSync(path.resolve(`${__dirname}/../../cache`)).length === 0)
})
