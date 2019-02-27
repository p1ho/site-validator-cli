'use strict'

module.exports = async (options) => {
  const urlsFromFileOnline = require('./helpers-get-urls/get-urls-from-file-online')
  const urlsFromCrawler = require('./helpers-get-urls/get-urls-from-crawler')
  const urlsFromFile = require('./helpers-get-urls/get-urls-from-file')

  var data
  if (options.singlePage === true) {
    data = [options.url]
  } else if (options.file === false) {
    var fileType = options.url.toLowerCase().split('.').pop()
    if (['txt', 'json', 'xml'].includes(fileType)) {
      data = await urlsFromFileOnline(options.url, options.cacheTime)
    } else {
      data = await urlsFromCrawler(options.url, options.cacheTime, options.debug)
    }
  } else {
    data = urlsFromFile(options.file)
  }

  if (data.length === 0) {
    throw new Error('No Urls found')
  }

  return data
}
