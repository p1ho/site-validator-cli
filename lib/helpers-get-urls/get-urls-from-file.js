'use strict'

const { readFileSync } = require('fs')
const clc = require('cli-color')
const parseFile = require('./parse-file')

module.exports = path => {
  const fileType = path.toLowerCase().split('.').pop()
  const data = readFileSync(path, 'utf-8').toString()

  var greenOnBlack = clc.xterm(47).bgXterm(0)
  var urls = parseFile(fileType, data)

  console.log('\n' + 'Pages found:')
  urls.forEach(e => { console.log(greenOnBlack(e)) })

  return urls
}
