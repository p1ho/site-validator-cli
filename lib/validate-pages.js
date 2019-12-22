'use strict'

module.exports = async (pagesToValidate, options) => {
  const PQueue = require('p-queue')
  const validatePage = require('./helpers-validate-pages/validate-page')
  const getResultText = require('./console-texts/get-result-text')
  const failFast = require('./helpers-validate-pages/fail-fast')
  const queue = new PQueue({ concurrency: 3 })
  const pagesNotFound = []
  const pagesFail = []
  const results = pagesToValidate.map(page => queue.add(async () => {
    const result = await validatePage(page, options.quiet, options.isLocal)
    console.log(getResultText(result, options.verbose))
    if (result.status === 'not found') { pagesNotFound.push(page) }
    if (result.errors !== 0) { pagesFail.push(page) }
    if (options.failfast) { failFast(pagesNotFound, pagesFail) }
    return result
  }))
  return Promise.all(results)
}
