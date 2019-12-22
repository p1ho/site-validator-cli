'use strict'

const fs = require('fs')

module.exports = (results, options) => {
  const outputPath = process.cwd().replace(/\\/g, '/')
  const pages = results.map(r => r.url)
  const pagesPassed = results.filter(r => r.status === 'pass')
  const pagesFailed = results.filter(r => r.status !== 'pass')
  const output = {
    url: options.path,
    pages: pages,
    quiet: options.quiet,
    singlePage: options.singlePage,
    passed: pagesFailed === 0,
    results: {
      passed: pagesPassed,
      failed: pagesFailed
    }
  }
  const json = JSON.stringify(output)
  console.log(`Saving data to: ${outputPath}/${options.output}.json`)
  fs.writeFileSync(`${outputPath}/${options.output}.json`, json, 'utf8', (err) => {
    if (err) { throw err }
  })
}
