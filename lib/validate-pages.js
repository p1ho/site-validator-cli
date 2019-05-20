'use strict'

module.exports = async (pagesToValidate, options) => {
  const validator = require('html-validator')
  const PQueue = require('p-queue')
  const printError = require('./helpers-validate-pages/print-error')
  const printFinish = require('./helpers-validate-pages/print-finish')
  const isNotFound = require('./helpers-validate-pages/is-not-found')
  const isValidHtml = require('./helpers-validate-pages/is-valid-html')
  const failFast = require('./helpers-validate-pages/fail-fast')
  const { greenOnBlack, redOnBlack } = require('./clc')

  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)
  console.log('__________________________________\n')

  const queue = new PQueue({ concurrency: 3 })
  let pagesNotFound = []
  let pagesFail = []

  const validatePage = async page => {
    try {
      let data = await validator({ url: page, isLocal: options.isLocal })
      let result = JSON.parse(data)

      if (isNotFound(result)) {
        pagesNotFound.push(page)
        console.log([redOnBlack('Page Not Found'), page].join(' '))
      } else {
        if (!isValidHtml(result, options.quiet)) {
          pagesFail.push(page)
          console.log([redOnBlack('Fail'), page].join(' '))
          if (options.verbose) {
            printError(result, options)
          }
        } else {
          console.log([greenOnBlack('Validated'), page].join(' '))
        }
      }
      if (options.failfast) {
        failFast(pagesNotFound, pagesFail)
      }
    } catch (error) {
      console.log([redOnBlack(error), page].join(' '))
    }
    return true
  }

  pagesToValidate.map(page => queue.add(async () => validatePage(page)))

  queue.onIdle().then(() => {
    console.log('__________________________________')
    printFinish(options.path, pagesTotal, pagesNotFound, pagesFail)
  })
}
