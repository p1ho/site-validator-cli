'use strict'

module.exports = async (url, cache = undefined, cacheTime = false) => {
  const validator = require('html-validator')

  if (cache !== undefined && cacheTime !== false && cache.getKey(url) !== undefined) {
    return JSON.parse(cache.getKey(url))
  } else {
    let data = await validator({ url: url })
    if (cache !== undefined) { cache.setKey(url, data) }
    return JSON.parse(data)
  }
}
