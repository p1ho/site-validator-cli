'use strict'

module.exports = async (options) => {
  const urlsFromFileOnline = require('./helpers-get-urls/get-urls-from-file-online')
  const urlsFromCrawler = require('./helpers-get-urls/get-urls-from-crawler')
  const urlsFromFile = require('./helpers-get-urls/get-urls-from-file')
  const getPathType = require('./helpers-get-urls/get-path-type')
  const normalizer = require('normalize-url')
  const { yellow } = require('./clc')

  var pathType = getPathType(options.path)
  var path = options.path
  var data
  if (pathType === 'file') {
    data = await urlsFromFile(options.path)
  } else {
    if (options.isLocal) {
      if (/^(localhost)/.test(options.path)) {
        path = normalizer(options.path, { forceHttp: true })
      }
    } else {
      if (!/^(http)/.test(options.path)) {
        path = normalizer(options.path, { forceHttps: true })
      }
    }
    if (pathType === 'online-file') {
      data = await urlsFromFileOnline(path, options.cacheTime, options.clearCache)
      if (data.length === 0) {
        console.log(yellow('No Urls Found, retrying with HTTP...'))
        path = normalizer(options.path, { forceHttp: true })
        data = await urlsFromFileOnline(path, options.cacheTime, options.clearCache)
      }
    } else {
      if (options.singlePage === true) {
        data = [path]
      } else {
        data = await urlsFromCrawler(path, options.cacheTime, options.clearCache, options.debug)
        if (data.length === 0) {
          console.log(yellow('No Urls Found, retrying with HTTP...'))
          path = normalizer(options.path, { forceHttp: true })
          data = await urlsFromCrawler(path, options.cacheTime, options.clearCache, options.debug)
        }
      }
    }
  }
  options.path = path

  if (data.length === 0) {
    throw new Error('No Urls found')
  }

  return data
}
