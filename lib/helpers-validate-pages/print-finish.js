'use strict'

const { greenOnBlack, redOnBlack, yellowOnBlack, cyanOnBlack } = require('../clc')

module.exports = (input, pagesTotal, pagesNotFound, pagesFail) => {
  if (pagesNotFound.length === 0 && pagesFail.length === 0) {
    console.log(`\n${greenOnBlack('Site Validated')} No problems were found for ${input}`)
  } else {
    if (pagesNotFound.length !== 0) {
      console.log(`\n${pagesNotFound.length} out of ${pagesTotal} pages not found for ${input}`)
      pagesNotFound.forEach((e) => { console.log(yellowOnBlack(e)) })
    }
    if (pagesFail.length !== 0) {
      console.log(`\n${redOnBlack('Site Failed Validation')}`)
      console.log(`\n${pagesFail.length} out of ${pagesTotal} pages failed validation for ${input}`)
      pagesFail.forEach((e) => { console.log(yellowOnBlack(e)) })
    }
  }

  console.log(cyanOnBlack('\nFinished Checking, have an A-1 Day!') + ' \n')
}
