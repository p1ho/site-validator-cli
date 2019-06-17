'use strict'

module.exports = async (pagesToValidate, options) => {
  const PQueue = require('p-queue')
  const validatePage = require('./helpers-validate-pages/validate-page')
  const printResult = require('./helpers-validate-pages/print-result')
  const failFast = require('./helpers-validate-pages/fail-fast')
  let queue = new PQueue({ concurrency: 3 })
  let pagesNotFound = []
  let pagesFail = []
  let results = pagesToValidate.map(page => queue.add(async () => {
    let result = await validatePage(page, options.quiet, options.isLocal)
    printResult(result, options.verbose)
    if (result.status === 'not found') { pagesNotFound.push(page) }
    if (result.errors !== 0) { pagesFail.push(page) }
    if (options.failfast) { failFast(pagesNotFound, pagesFail) }
    return result
  }))
  return Promise.all(results)
}
