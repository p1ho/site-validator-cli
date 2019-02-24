'use strict'

/*
Making async work as intended in a forEach loop.
https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = async (pagesToValidate, options) => {
  const path = require('path')
  const pagesHash = require('crypto').createHash('sha1').update(pagesToValidate.join('_')).digest('hex')
  const clc = require('cli-color')
  const Cache = require('./Cache')
  const getResult = require('./helpers-validate-pages/get-result')
  const printError = require('./helpers-validate-pages/print-error')
  const printFinish = require('./helpers-validate-pages/print-finish')
  const isNotFound = require('./helpers-validate-pages/is-not-found')
  const isValidHtml = require('./helpers-validate-pages/is-valid-html')
  const failFast = require('./helpers-validate-pages/fail-fast')

  var greenOnBlack = clc.xterm(47).bgXterm(0)
  var redOnBlack = clc.xterm(196).bgXterm(0)

  var cachePath = path.resolve(`${__dirname}/../cache/w3c/`)
  var cache = new Cache(pagesHash, cachePath, options.cacheTime)

  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)

  let pagesNotFound = []
  let pagesFail = []

  asyncForEach(pagesToValidate, async (page, i) => {
    console.log('__________________________________')
    console.log(`\nChecking page ${i + 1} of ${pagesTotal} pages`)
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
  }).then(() => {
    cache.save()
    console.log('__________________________________')
    printFinish((options.file || options.url), pagesTotal, pagesNotFound, pagesFail)
  })
}
