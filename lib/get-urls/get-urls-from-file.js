'use strict'

const { readFileSync } = require('fs')
const xmlParser = require('fast-xml-parser')

module.exports = path => {
  const clc = require('cli-color')
  const fileType = path.toLowerCase().split('.').pop()
  const data = readFileSync(path, 'utf-8').toString()

  var redOnBlack = clc.xterm(196).bgXterm(0)
  var greenOnBlack = clc.xterm(47).bgXterm(0)
  var urls

  if (fileType !== 'json' && fileType !== 'txt' && fileType !== 'xml') {
    console.log('\n' + redOnBlack('Unallowed file type') + ' exiting...\n')
    process.exit(1)
  } else if (fileType === 'json') {
    urls = JSON.parse(data)
    if (!Array.isArray(urls)) {
      console.log('\n' + redOnBlack('Unallowed json format') + ' exiting...\n')
      process.exit(1)
    }
  } else if (fileType === 'txt') {
    urls = data.split(/\r?\n/).filter( url => url.trim() !== '')
  } else {
    var json = xmlParser.parse(data)
    try {
      if (json.urlset.url.length === 1 || json.urlset.url.length === undefined) {
        urls = [json.urlset.url.loc]
      } else {
        urls = json.urlset.url.map(o => { return o.loc })
      }
      urls = urls.filter(url => !/(\.pdf)$/i.test(url))
    } catch (error) {
      console.log('\n' + redOnBlack('Unallowed xml format') + ' exiting...\n')
      process.exit(1)
    }
  }

  if (urls.length === 0) {
    console.log('\n' + redOnBlack('No Urls found') + ' exiting...\n')
    process.exit(1)
  }

  console.log('\n' + 'Pages found')
  urls.forEach(e => { console.log(greenOnBlack(e)) })

  return urls
}
