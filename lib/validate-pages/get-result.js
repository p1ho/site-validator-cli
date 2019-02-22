'use strict'

module.exports = async (url, cache, cacheTime) => {
  const validator = require('html-validator')

  var now = new Date().getTime()
  var expire = now + cacheTime

  if (cacheTime !== 0 && cache !== undefined) {
    let cacheOld = cache.getKey(url)
    if (cacheOld !== undefined && cacheOld.expire >= now) {
      console.log('\nPage validation cache found!')
      return JSON.parse(cacheOld.data)
    } else {
      console.log('\nPage validation cache not available, revalidating...')
      let data = await validator({ url: url })
      let cacheNew = {
        expire: expire,
        data: data
      }
      cache.setKey(url, cacheNew)
      return JSON.parse(data)
    }
  } else {
    console.log('\nValidating without cache...')
    let data = await validator({ url: url })
    return JSON.parse(data)
  }
}
