'use strict'

const fs = require('fs')

module.exports = (results, options) => {
  let outputPath = process.cwd().replace(/\\/g, '/')
  let pages = results.map(r => r.url)
  let pagesPassed = results.filter(r => r.status === 'pass')
  let pagesFailed = results.filter(r => r.status !== 'pass')
  let output = {
    url: options.path,
    pages: pages,
    params: {
      verbose: options.verbose,
      quiet: options.quiet,
      singlePage: options.singlePage
    },
    passed: pagesFailed === 0,
    results: {
      passed: pagesPassed,
      failed: pagesFailed
    }
  }
  let json = JSON.stringify(output)
  console.log(`Saving data to: ${outputPath}/${options.output}.json`)
  fs.writeFileSync(`${outputPath}/${options.output}.json`, json, 'utf8', (err) => {
    if (err) { throw err }
  })
}
