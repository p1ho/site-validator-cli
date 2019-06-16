'use strict'

const { greenOnBlack, redOnBlack, yellowOnBlack } = require('./clc')

module.exports = (input, results) => {
  console.log('═══════════════════════════════════════════════════════════════')
  let pagesNotFound = results.filter(result => result.status === 'not found')
  let pagesFail = results.filter(result => result.status === 'fail')

  if (pagesNotFound.length === 0 && pagesFail.length === 0) {
    console.log(`\n${greenOnBlack('Site Validated')} No problems were found for ${input}`)
  } else {
    if (pagesNotFound.length !== 0) {
      var notFoundMsg = `\n${pagesNotFound.length} out of ${results.length} pages not found for ${input}\n`
      pagesNotFound.forEach((e) => { notFoundMsg += (yellowOnBlack(e.url) + '\n') })
      console.error(notFoundMsg)
    }
    if (pagesFail.length !== 0) {
      var failMsg = `\n${redOnBlack('Site Failed Validation')}` +
                    `\n${pagesFail.length} out of ${results.length} pages failed validation for ${input}\n`
      pagesFail.forEach((e) => { failMsg += redOnBlack(e.url) + '\n' })
      console.error(failMsg)
    }
  }
}
