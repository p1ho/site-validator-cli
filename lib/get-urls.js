'use strict'

module.exports = async (options) => {
  const urlsFromCrawler = require('./helpers-get-urls/get-urls-from-crawler')
  const urlsFromFile = require('./helpers-get-urls/get-urls-from-file')

  var data
  if (options.file === false) {
    data = await urlsFromCrawler(options.url, options.cacheTime, options.debug)
  } else {
    data = urlsFromFile(options.file)
  }

  if (data.length === 0) {
    throw new Error('No Urls found')
  }

  return data
}
