'use strict'

module.exports = async (options) => {
  const urlsFromCrawler = require('./get-urls-from-crawler')
  const urlsFromFile = require('./get-urls-from-file')

  var data
  if (options.file === false) {
    data = await urlsFromCrawler(options.url, options.cacheTime)
  } else {
    data = urlsFromFile(options.file)
  }

  return data
}
