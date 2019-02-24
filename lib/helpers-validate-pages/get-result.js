'use strict'

module.exports = async (url, cache, cacheTime) => {
  const validator = require('html-validator')

  var cacheOld = cache.getKey(url)

  if (cacheTime !== false && cacheOld !== undefined) {
    console.log('\nPage validation cache found!')
    return JSON.parse(cacheOld)
  } else {
    console.log('\nValidating...')
    let data = await validator({ url: url })
    cache.setKey(url, data)
    return JSON.parse(data)
  }
}
