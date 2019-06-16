'use strict'

module.exports = async (pagesToValidate, options) => {
  const validator = require('html-validator')
  const PQueue = require('p-queue')
  const printError = require('./helpers-validate-pages/print-error')
  const isNotFound = require('./helpers-validate-pages/is-not-found')
  const parseData = require('./helpers-validate-pages/parse-data')
  const failFast = require('./helpers-validate-pages/fail-fast')
  const { greenOnBlack, redOnBlack } = require('./clc')

  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)
  console.log('═══════════════════════════════════════════════════════════════')
  if (options.verbose) {
    console.log('')
  }

  const queue = new PQueue({ concurrency: 1 })
  let pagesNotFound = []
  let pagesFail = []

  const validatePage = async page => {
    let result = {
      url: page,
      status: undefined,
      errors: []
    }
    try {
      let data = await validator({ url: page, isLocal: options.isLocal })
      let dataParsed = JSON.parse(data)
      if (isNotFound(dataParsed)) {
        result.status = 'not found'
        console.log([redOnBlack('MISS'), page].join(' '))
        pagesNotFound.push(page)
      } else {
        var errors
        if (options.quiet) {
          errors = parseData(dataParsed.messages.filter(m => m.type === 'error'))
        } else {
          errors = parseData(dataParsed.messages)
        }
        if (errors.length !== 0) {
          result.status = 'fail'
          result.errors = errors
          console.log([redOnBlack('FAIL'), page].join(' '))
          if (options.verbose) {
            printError(errors)
          }
          pagesFail.push(page)
        } else {
          result.status = 'pass'
          console.log([greenOnBlack('PASS'), page].join(' '))
        }
      }
      if (options.verbose) {
        console.log('')
      }
      if (options.failfast) {
        failFast(pagesNotFound, pagesFail)
      }
    } catch (error) {
      result.status = 'error'
      result.errors.push(error)
      console.log([redOnBlack(error), page].join(' '))
    }
    return result
  }
  let results = pagesToValidate.map(page => queue.add(async () => validatePage(page)))
  return Promise.all(results)
}
