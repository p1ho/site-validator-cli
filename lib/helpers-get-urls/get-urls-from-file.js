'use strict'

const { readFileSync } = require('fs')
const { greenOnBlack } = require('../clc')
const parseFile = require('./parse-file')

module.exports = path => {
  const fileType = path.toLowerCase().split('.').pop()
  const data = readFileSync(path, 'utf-8').toString()

  var urls = parseFile(fileType, data)

  console.log('\n' + 'Pages found:')
  urls.forEach(e => { console.log(greenOnBlack(e)) })

  return urls
}
