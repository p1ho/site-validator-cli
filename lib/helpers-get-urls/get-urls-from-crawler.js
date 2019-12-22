'use strict'

const path = require('path')
const Cache = require('../Cache')
const Crawler = require('simplecrawler')
const { greenOnBlack } = require('../clc')

module.exports = (url, cacheTime, clearCache) => {
  return new Promise(function (resolve, reject) {
    try {
      const urlHash = require('crypto').createHash('sha1').update(url).digest('hex')

      var cachePath = path.resolve(`${__dirname}/../../cache/sitemap/`)
      var cache = new Cache(urlHash, cachePath, cacheTime)
      var cacheOld

      if (clearCache) {
        cache.remove()
        console.log(`\nCache cleared for ${url}`)
      } else {
        cacheOld = cache.getKey(url)
      }

      if (cacheTime !== false && cacheOld !== undefined) {
        console.log('\n' + greenOnBlack('Success') + ` Site URLs Cache found for ${url}`)
        console.log('\n' + 'Pages found in cache')
        cacheOld.forEach(e => { console.log(greenOnBlack(e)) })
        return resolve(cacheOld)
      } else {
        console.log(`\nFetching Site Urls for ${url} ...`)
        console.log('This may take a while...\n')
      }

      console.log('Pages crawled:')

      var urls = []
      var crawler = Crawler(url)

      crawler.addDownloadCondition((queueItem, response, callback) => {
        let shouldDownload
        try {
          shouldDownload = queueItem.stateData.contentType.includes('text/html')
        } catch (err) {
          shouldDownload = false
        }
        callback(null, shouldDownload)
      })

      crawler.on('fetchcomplete', (queueItem, data, res) => {
        urls.push(queueItem.url)
        console.log(greenOnBlack(queueItem.url))
      })

      crawler.on('complete', async () => {
        if (cacheTime !== false) {
          cache.setKey(url, urls)
          cache.save()
        }
        return resolve(urls)
      })

      crawler.start()
    } catch (error) {
      return reject(error)
    }
  })
}
