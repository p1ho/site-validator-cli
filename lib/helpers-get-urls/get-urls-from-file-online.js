'use strict'

const path = require('path')
const https = require('https')
const parseFile = require('./parse-file')
const Cache = require('../Cache')
const { greenOnBlack } = require('../clc')

module.exports = (url, fileType, cacheTime) => {
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
      console.log(`\nFetching ${url} ...`)

      /*
      https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
       */
      var data = ''
      https.get(url, (resp) => {
        var status = resp.statusCode
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          try {
            if (status !== 200) {
              throw new Error(`Server responded with status code ${status}`)
            }
            console.log('\nFile fetched successfully')
            var urls = parseFile(fileType, data)
            if (cacheTime !== false) {
              cache.setKey(url, urls)
              cache.save()
            }
            console.log('\n' + 'Pages found:')
            urls.forEach(e => { console.log(greenOnBlack(e)) })
            return resolve(urls)
          } catch (error) {
            reject(error)
          }
        })
      }).on('error', (error) => {
        reject(error)
      })
    }
  })
}
