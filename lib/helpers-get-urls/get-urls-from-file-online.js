'use strict'

const path = require('path')
const fetchFile = require('./fetch-file')
const Cache = require('../Cache')
const { greenOnBlack } = require('../clc')

module.exports = (url, cacheTime) => {
  return new Promise(async function (resolve, reject) {
    const urlHash = require('crypto').createHash('sha1').update(url).digest('hex')

    var cachePath = path.resolve('./cache/sitemap/')
    var cache = new Cache(urlHash, cachePath, cacheTime)
    var cacheOld = cache.getKey(url)

    if (cacheTime !== false && cacheOld !== undefined) {
      console.log('\n' + greenOnBlack('Success') + ` Online File Cache found for ${url}`)
      console.log('\n' + 'Pages found in cache')
      cacheOld.forEach(e => { console.log(greenOnBlack(e)) })
      return resolve(cacheOld)
    } else {
      try {
        var urls = await fetchFile(url)
        if (cacheTime !== false) {
          cache.setKey(url, urls)
          cache.save()
        }
        console.log('\n' + 'Pages found:')
        urls.forEach(e => { console.log(greenOnBlack(e)) })
        return resolve(urls)
      } catch (error) {
        return reject(error)
      }
    }
  })
}
