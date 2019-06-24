'use strict'

const { existsSync, readFileSync } = require('fs')
const validateOutput = require('./validate-output')
const { cyanOnBlack } = require('../clc')
const getResultText = require('../console-texts/get-result-text')
const getSummaryText = require('../console-texts/get-summary-text')
const exit = require('../exit')

module.exports = (path) => {
  if (existsSync(path)) {
    var output = JSON.parse(readFileSync(path, 'utf-8').toString())
    if (!validateOutput(output)) {
      exit(`File ${path} is not a valid report`, true)
    } else {
      console.log(`\nReport for ${cyanOnBlack(output.url)} (${output.pages.length} pages)`)
      console.log(`Quiet Mode: ${cyanOnBlack(output.quiet)}\n`)
      console.log('═════════════════════════════════════════════════════════════\n')
      for (let result of [].concat(output.results.passed, output.results.failed)) {
        console.log(getResultText(result, true))
      }
      console.log('═════════════════════════════════════════════════════════════')
      console.log(getSummaryText(output.url, output.results.failed))
      process.exit(0)
    }
  } else {
    exit(`File ${path} not found!`, true)
  }
}
