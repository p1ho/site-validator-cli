'use strict'

module.exports = async (options) => {
  const urlsFromFileOnline = require('./helpers-get-urls/get-urls-from-file-online')
  const urlsFromCrawler = require('./helpers-get-urls/get-urls-from-crawler')
  const urlsFromFile = require('./helpers-get-urls/get-urls-from-file')
  const normalizer = require('normalize-url')
  const fileExists = require('./file-exists')
  const exit = require('./exit')

  var allowedFileType = ['txt', 'json', 'xml']
  var fileType = options.path.toLowerCase().split('.').pop()

  var data
  if (fileExists(options.path)) {
    if (options.singlePage === true) {
      exit('page flag cannot be used with file!', true)
    } else {
      data = await urlsFromFile(options.path)
    }
  } else {
    if (!/^(http)/.test(options.path)) {
      options.path = normalizer(options.path, {forceHttps: true})
    }
    if (allowedFileType.includes(fileType)) {
      if (options.singlePage === true) {
        exit('page flag cannot be used with file!', true)
      } else {
        data = await urlsFromFileOnline(options.path, options.cacheTime)
      }
    } else {
      if (options.singlePage === true) {
        data = [options.path]
      } else {
        data = await urlsFromCrawler(options.path, options.cacheTime, options.debug)
      }
    }
  }

  if (data.length === 0) {
    throw new Error('No Urls found')
  }

  return data
}
