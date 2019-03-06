'use strict'

module.exports = async (options) => {
  const urlsFromFileOnline = require('./helpers-get-urls/get-urls-from-file-online')
  const urlsFromCrawler = require('./helpers-get-urls/get-urls-from-crawler')
  const urlsFromFile = require('./helpers-get-urls/get-urls-from-file')
  const normalizer = require('normalize-url')
  const { redOnBlack } = require('./clc')
  const fileExists = require('./file-exists')
  const exit = require('./exit')

  var allowedFileType = ['txt', 'json', 'xml']
  var fileType = options.path.toLowerCase().split('.').pop()

  var data
  if (fileExists(options.path)) {
    if (options.singlePage === true) {
      exit(redOnBlack('page flag cannot be used with file!'), true)
    } else {
      data = await urlsFromFile(options.path)
    }
  } else {
    if (allowedFileType.includes(fileType)) {
      data = await urlsFromFileOnline(normalizer(options.path), options.cacheTime)
    } else {
      data = await urlsFromCrawler(normalizer(options.path), options.cacheTime, options.debug)
    }
  }

  if (data.length === 0) {
    throw new Error('No Urls found')
  }

  return data
}
