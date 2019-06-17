#!/usr/bin/env node
'use strict'

/*
Require statements
 */
const minimist = require('minimist')
const sanitize = require('sanitize-filename')
const clearCache = require('./lib/clear-cache')
const getUrls = require('./lib/get-urls')
const validatePages = require('./lib/validate-pages')
const getHelpText = require('./lib/get-help-text')
const printSummary = require('./lib/print-summary')
const { cyanOnBlack } = require('./lib/clc')
const pkg = require('./package.json')
const exit = require('./lib/exit')
const exportOutput = require('./lib/export-output')

/*
Parsing query parameters
 */
const query = process.argv[2]
const argv = minimist(process.argv.slice(2))
const outputName = `${new Date().toISOString().substring(0, 19).replace(/[:\-_]/gi, '')}`

let options = {
  cacheTime: argv.cacheTime !== undefined ? argv.cacheTime : argv.cache !== undefined ? argv.cache : false,
  failfast: argv.ff !== undefined,
  verbose: argv.verbose !== undefined,
  quiet: argv.quiet !== undefined,
  debug: argv.debug !== undefined,
  singlePage: argv.page !== undefined,
  isLocal: argv.isLocal !== undefined || argv.local !== undefined,
  output: argv.output !== undefined ? argv.output === true ? outputName : sanitize(argv.output) : false
}

/*
Process query parameters
 */
var helpKW = ['help', '-h', '--help']
if (!query || helpKW.map(x => { return process.argv.indexOf(x) !== -1 }).indexOf(true) !== -1) {
  exit(getHelpText())
}

var versionKW = ['version', '-v', '--version']
if (versionKW.map(x => { return process.argv.indexOf(x) !== -1 }).indexOf(true) !== -1) {
  exit(pkg.version)
}

if (argv.path) {
  options.path = argv.path
} else {
  options.path = argv._[0]
}

if (argv['clear-cache'] || argv['clearCache']) {
  clearCache('sitemap')
  if (options.path === undefined) {
    exit('No path entered, exiting...')
  }
}

/*
Main Process
 */
(async () => {
  try {
    let pagesToValidate = await getUrls(options)
    console.log(`\nEvaluating a total of ${pagesToValidate.length} pages`)
    console.log('═════════════════════════════════════════════════════════════')
    if (options.verbose) { console.log('') }
    let results = await validatePages(pagesToValidate, options)
    console.log('═════════════════════════════════════════════════════════════')
    printSummary(options.path, results)
    if (options.output) {
      exportOutput(results, options)
    }
    exit(cyanOnBlack('Finished Checking, have an A-1 Day!'))
  } catch (error) {
    exit(error, true)
  }
})()
