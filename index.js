#!/usr/bin/env node
'use strict'

/*
Require statements
 */
const normalizer = require('normalize-url')
const minimist = require('minimist')

const getUrls = require('./lib/get-urls/get-urls')
const fileExists = require('./lib/file-exists')
const processPages = require('./lib/validate-pages/process-pages')
const getHelpText = require('./lib/get-help-text')

const pkg = require('./package.json')

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

/*
Process query parameters
 */
var helpKW = ['help', '-h', '--help']
if (!query || helpKW.map(x => { return process.argv.indexOf(x) !== -1 }).indexOf(true) !== -1) {
  console.log(getHelpText())
  process.exit(0)
}

var versionKW = ['version', '-v', '--version']
if (versionKW.map(x => { return process.argv.indexOf(x) !== -1 }).indexOf(true) !== -1) {
  console.log(pkg.version)
  process.exit(0)
}

if (argv.url) {
  options.url = normalizer(argv.url)
} else {
  options.url = argv._[0] ? normalizer(argv._[0]) : false
}

if (argv.file) {
  if (fileExists(argv.file)) {
    options.file = argv.file
  } else {
    console.error('File not found!')
    process.exit(1)
  }
} else {
  options.file = fileExists(argv._[0]) ? argv._[0] : false
}

/*
Main Process
 */
(async () => {
  let pagesToValidate = await getUrls(options)
  processPages(pagesToValidate, options)
})()
