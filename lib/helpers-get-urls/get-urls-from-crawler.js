'use strict'

const path = require('path')
const clc = require('cli-color')
const Cache = require('../Cache')
const Crawler = require('simplecrawler')

module.exports = (url, cacheTime, debug) => {
  return new Promise(async function (resolve, reject) {
    try {
      const urlHash = require('crypto').createHash('sha1').update(url).digest('hex')

      var greenOnBlack = clc.xterm(47).bgXterm(0)
      var cachePath = path.resolve(`${__dirname}/../../cache/sitemap/`)
      var cache = new Cache(urlHash, cachePath, cacheTime)
      var cacheOld = cache.getKey(url)

      if (cacheTime !== 0 && cacheOld !== undefined) {
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

      /*
      Commented out because maybe we could use later
      There seems to be problem with caching mechanism for node.js v10
      https://github.com/simplecrawler/simplecrawler/pull/447

      Right now will use flat caching which should work just as well.
       */
      // crawler.cache = Crawler.cache(__dirname + '/../../cache');

      crawler.addDownloadCondition((queueItem, response, callback) => {
        callback(null,
          queueItem.stateData.contentType.includes('text/html')
        )
      })

      crawler.on('fetchcomplete', (queueItem, data, res) => {
        urls.push(queueItem.url)
        console.log(greenOnBlack(queueItem.url))
      })

      crawler.on('complete', async () => {
        if (cacheTime !== 0) {
          cache.setKey(url, urls)
          cache.save()
        }
        return resolve(urls)
      })

      /*
      The following code console.logs errors on debug mode
       */
      if (debug) {
        var redOnBlack = clc.xterm(196).bgXterm(0)

        crawler.on('invaliddomain', (queueItem) => {
          console.log('Ignored Domain: ' + redOnBlack(queueItem.url))
        })

        crawler.on('fetchdisallowed', (queueItem) => {
          console.log('Disallowed: ' + redOnBlack(queueItem.url))
        })

        crawler.on('fetchconditionerror', (queueItem, error) => {
          console.log('Fetch Condition Error: ' + redOnBlack(queueItem.url) + ' -> ' + error)
        })

        crawler.on('fetcherror', (queueItem, response) => {
          console.log('Fetch Error: ' + redOnBlack(queueItem.url) + ' -> ' + response)
        })

        crawler.on('fetchtimeout', (queueItem, timeout) => {
          console.log('Timeout: ' + redOnBlack(queueItem.url) + ' timed out after ' + timeout + 'ms')
        })

        crawler.on('fetchclienterror', (queueItem, error) => {
          console.log('Request Error: ' + redOnBlack(queueItem.url) + ' -> ' + error)
        })

        crawler.on('downloadconditionerror', (queueItem, error) => {
          console.log('Download Condition Error: ' + redOnBlack(queueItem.url) + ' -> ' + error)
        })

        crawler.on('fetchdataerror', (queueItem, response) => {
          console.log('Fetch Data Error: ' + redOnBlack(queueItem.url) + ' -> ' + response)
        })
      }

      crawler.start()
    } catch (error) {
      return reject(error)
    }
  })
}
