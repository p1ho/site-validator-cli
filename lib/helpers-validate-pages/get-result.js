'use strict'

module.exports = async (url, cache = undefined, cacheTime = false) => {
  const validator = require('html-validator')

  if (cache !== undefined && cacheTime !== false && cache.getKey(url) !== undefined) {
    console.log('\nPage validation cache found!')
    return JSON.parse(cache.getKey(url))
  } else {
    console.log('\nValidating...')
    let data = await validator({ url: url })
    if (cache !== undefined) { cache.setKey(url, data) }
    return JSON.parse(data)
  }
}
