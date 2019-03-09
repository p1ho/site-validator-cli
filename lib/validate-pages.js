'use strict'

module.exports = async (pagesToValidate, options) => {
  const PQueue = require('p-queue')
  const path = require('path')
  const pagesHash = require('crypto').createHash('sha1').update(pagesToValidate.join('_')).digest('hex')
  const Cache = require('./Cache')
  const getResult = require('./helpers-validate-pages/get-result')
  const printError = require('./helpers-validate-pages/print-error')
  const printFinish = require('./helpers-validate-pages/print-finish')
  const isNotFound = require('./helpers-validate-pages/is-not-found')
  const isValidHtml = require('./helpers-validate-pages/is-valid-html')
  const failFast = require('./helpers-validate-pages/fail-fast')
  const { greenOnBlack, redOnBlack } = require('./clc')

  var useCache = options.cacheTime !== false
  var cachePath = path.resolve(`${__dirname}/../cache/w3c/`)
  var cache = useCache ? new Cache(pagesHash, cachePath, options.cacheTime) : undefined

  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)
  console.log('__________________________________\n')

  const queue = new PQueue({ concurrency: 3 })
  let pagesNotFound = []
  let pagesFail = []

  const validatePage = async page => {
    try {
      let result = await getResult(page, cache, options.cacheTime)

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
    if (useCache) { cache.save() }
    console.log('__________________________________')
    printFinish(options.path, pagesTotal, pagesNotFound, pagesFail)
  })
}
