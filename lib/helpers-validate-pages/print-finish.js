'use strict'

const { greenOnBlack, redOnBlack, yellowOnBlack, cyanOnBlack } = require('../clc')
const exit = require('../exit')

module.exports = (input, pagesTotal, pagesNotFound, pagesFail) => {
  if (pagesNotFound.length === 0 && pagesFail.length === 0) {
    console.log(`\n${greenOnBlack('Site Validated')} No problems were found for ${input}`)
  } else {
    if (pagesNotFound.length !== 0) {
      var notFoundMsg = `\n${pagesNotFound.length} out of ${pagesTotal} pages not found for ${input}\n`
      pagesNotFound.forEach((e) => { notFoundMsg += (yellowOnBlack(e) + '\n') })
      console.error(notFoundMsg)
    }
    if (pagesFail.length !== 0) {
      var failMsg = `\n${redOnBlack('Site Failed Validation')}` +
                    `\n${pagesFail.length} out of ${pagesTotal} pages failed validation for ${input}\n`
      pagesFail.forEach((e) => { failMsg += yellowOnBlack(e) + '\n' })
      console.error(failMsg)
    }
  }

  exit(cyanOnBlack('Finished Checking, have an A-1 Day!'))
}
