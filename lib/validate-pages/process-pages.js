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
  const Cache = require('../cache')
  const getResult = require('./get-result.js')
  const printError = require('./print-error.js')

  var greenOnBlack = clc.xterm(47).bgXterm(0)
  var redOnBlack = clc.xterm(196).bgXterm(0)
  var yellowOnBlack = clc.xterm(11).bgXterm(0)
  var cyanOnBlack = clc.xterm(14).bgXterm(0)

  var cachePath = path.resolve(`${__dirname}/../../cache/w3c/`)
  var cache = new Cache(pagesHash, cachePath, options.cacheTime)

  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)

  let pagesNotFound = []
  const isNotFound = (result) => {
    try {
      return result.messages[0].type === 'non-document-error'
    } catch (error) {
      return false
    }
  }

  let pagesFail = []
  const isValidHtml = (result, quiet) => {
    var err = (quiet) ? result.messages.filter(m => m.type === 'error') : result.messages
    return err.length === 0
  }

  console.log('__________________________________')

  const failFast = (pagesNotFound, pagesFail) => {
    if (pagesNotFound.length > 0 || pagesFail.length > 0) {
      console.log(`\n${redOnBlack('Fast Fail Mode: Site Failed Validation')} \n`)
      process.exit(1)
    }
  }

  asyncForEach(pagesToValidate, async (page, i) => {
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
    console.log('__________________________________')
  }).then(() => {
    cache.save()
    if (pagesFail.length === 0 && pagesNotFound.length === 0) {
      console.log(`\n${greenOnBlack('Site Validated')} No problems were found for ${options.file || options.url}`)
    } else {
      if (pagesFail.length !== 0) {
        console.log(`\n${redOnBlack('Site Failed Validation')}`)
        console.log(`\n${pagesFail.length} out of ${pagesTotal} pages failed validation for ${options.file || options.url}`)
        pagesFail.forEach((e) => { console.log(yellowOnBlack(e)) })
      }
      if (pagesNotFound.length !== 0) {
        console.log(`\n${pagesNotFound.length} out of ${pagesTotal} pages not found for ${options.file || options.url}`)
        pagesNotFound.forEach((e) => { console.log(yellowOnBlack(e)) })
      }
    }

    console.log(cyanOnBlack('\nFinished Checking, have an A-1 Day!') + ' \n')
  })
}
