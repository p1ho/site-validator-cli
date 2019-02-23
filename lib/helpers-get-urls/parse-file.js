'use strict'

const xmlParser = require('fast-xml-parser')

module.exports = (fileType, data) => {
  var urls
  if (fileType !== 'json' && fileType !== 'txt' && fileType !== 'xml') {
    throw new Error('Unallowed file type')
  } else if (fileType === 'json') {
    try {
      urls = JSON.parse(data)
    } catch (error) {
      throw new Error('Invalid JSON')
    }
    if (!Array.isArray(urls)) {
      throw new Error('Unallowed JSON format')
    }
  } else if (fileType === 'txt') {
    urls = data.split(/\r?\n/).filter(url => url.trim() !== '')
  } else {
    try {
      var json = xmlParser.parse(data)
    } catch (error) {
      throw new Error('Invalid XML')
    }
    try {
      if (json.urlset.url.length === 1 || json.urlset.url.length === undefined) {
        urls = [json.urlset.url.loc]
      } else {
        urls = json.urlset.url.map(o => { return o.loc })
      }
      urls = urls.filter(url => !/(\.pdf)$/i.test(url))
    } catch (error) {
      throw new Error('Unallowed XML format')
    }
  }
  return urls
}
