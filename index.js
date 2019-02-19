#!/usr/bin/env node
'use strict'

/*
Require statements
 */
const path = require('path')
const normalizer = require('normalize-url')
const validator = require('html-validator')
const minimist = require('minimist')
const clc = require('cli-color')
const flatCache = require('flat-cache')
const urlsFromCrawling = require('./lib/getUrlsFromCrawler')
const getHelpText = require('./lib/getHelpText')
const pkg = require('./package.json')

/*
Define text styling
 */
var greenOnBlack = clc.xterm(47).bgXterm(0)
var redOnBlack = clc.xterm(196).bgXterm(0)
var blackOnRed = clc.xterm(15).bgXterm(124)
var blackOnYellow = clc.xterm(0).bgXterm(11)
var cyanOnBlack = clc.xterm(14).bgXterm(0)

/*
Parsing query parameters
 */
const query = process.argv[2]
const argv = minimist(process.argv.slice(2))

let options = {
  cacheTime: argv.cacheTime !== undefined ? argv.cacheTime * 1000 * 60 : 0,
  failfast: argv.ff !== undefined,
  verbose: argv.verbose !== undefined,
  quiet: argv.quiet !== undefined
}

var now = new Date().getTime()

/*
Init Cache
 */
if (options.cacheTime !== 0) {
  var w3cCache = flatCache.load('w3cCache', path.resolve('./cache'))
  var expire = now + options.cacheTime
}

/*
Process query parameters
 */
if (!query || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  console.log(getHelpText())
  process.exit(0)
}

if (!query || process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version)
  process.exit(0)
}

options.url = argv.url ? normalizer(argv.url) : normalizer(argv._[0]);

/*
Main Process
 */
(async () => {
  function isValidHtml (result, quiet) {
    var err = (quiet) ? result.messages.filter(m => m.type === 'error') : result.messages
    return err.length === 0
  }

  let pagesToValidate = await urlsFromCrawling(options.url, options.cacheTime)
  let pagesTotal = pagesToValidate.length
  console.log(`\nEvaluating a total of ${pagesTotal} pages`)

  let pagesFail = []

  console.log('__________________________________')

  const validateNextPage = async () => {
    if (pagesToValidate.length > 0) {
      console.log(`\nChecking page ${pagesTotal + 1 - pagesToValidate.length} of ${pagesTotal} pages`)

      const getResult = async (url) => {
        let data = await validator({ url: url })
        if (options.cacheTime !== 0) {
          var cacheNew = {
            expire: expire,
            data: data
          }
          w3cCache.setKey(url, cacheNew)
          w3cCache.save(true)
        }
        return data
      }

      const printResult = (json) => {
        if (isValidHtml(json, options.quiet)) {
          console.log(greenOnBlack('Validated') + ` ${pageUrl}`)
        } else {
          console.log(redOnBlack('Failed') + ` ${pageUrl}`)
          pagesFail.push(pageUrl)

          const printError = (msg) => {
            var firstLine = msg.firstLine || msg.lastLine
            var lastLine = msg.lastLine || msg.firstLine
            var firstCol = msg.firstColumn || msg.lastColumn
            var lastCol = msg.lastColumn || msg.firstColumn

            var errorType = (msg.subType || msg.type).toUpperCase()

            if (msg.type === 'error') {
              console.log(`\n[${errorType}] From line ${firstLine}, column ${firstCol}; ` +
                          `to line ${lastLine}, column ${lastCol}`)
              console.log(blackOnRed(msg.message) + ' \n')
            } else {
              if (!options.quiet) {
                console.log(`\n[${errorType}] From line ${firstLine}, column ${firstCol}; ` +
                            `to line ${lastLine}, column ${lastCol}`)
                console.log(blackOnYellow(msg.message) + ' \n')
              }
            }
          }

          if (options.verbose) {
            if (json.messages.length === 1) {
              printError(json.messages[0])
            } else {
              for (let error of json.messages) {
                printError(error)
              }
            }
          }
        }
      }

      let pageUrl = pagesToValidate.shift()
      if (options.cacheTime !== 0 && w3cCache !== undefined) {
        let cacheOld = w3cCache.getKey(pageUrl)
        if (cacheOld !== undefined && cacheOld.expire >= now) {
          console.log('\nPage validation cache found!')
          printResult(JSON.parse(cacheOld.data))
        } else {
          console.log('\nPage validation cache not available, revalidating...')
          let result = await getResult(pageUrl)
          printResult(JSON.parse(result))
        }
      } else {
        let result = await getResult(pageUrl)
        printResult(JSON.parse(result))
      }
      console.log('__________________________________')
      if (options.failfast && pagesFail.length > 0) {
        console.log('\n' + redOnBlack('Fast Fail Mode: Site Failed Validation') + ' \n')
        process.exit(1)
      } else {
        await validateNextPage()
      }
    } else {
      if (pagesFail.length === 0) {
        console.log('\n' + greenOnBlack('Site Validated') + ` No problems were found for ${options.url}`)
      } else {
        console.log('\n' + redOnBlack('Site Failed Validation') +
        ` ${pagesFail.length} out of ${pagesTotal} pages failed validation for ${options.url}:\n`)
        pagesFail.forEach((e) => { console.log(e) })
      }
      console.log(cyanOnBlack('\nFinished Checking, have an A-1 Day!') + ' \n')
    }
  }

  await validateNextPage()
})()
