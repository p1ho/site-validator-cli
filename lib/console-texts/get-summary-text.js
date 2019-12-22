'use strict'

const { greenOnBlack, redOnBlack, yellowOnBlack } = require('../clc')

module.exports = (input, results) => {
  const pagesNotFound = results.filter(result => result.status === 'not found')
  const pagesError = results.filter(result => result.status === 'error')
  const pagesFail = results.filter(result => result.status === 'fail')
  let text = ''

  if (pagesNotFound.length === 0 && pagesError.length === 0 && pagesFail.length === 0) {
    text += `\n${greenOnBlack('Site Validated')} No problems were found for ${input}\n`
  } else {
    if (pagesNotFound.length !== 0) {
      var notFoundMsg = `${pagesNotFound.length} out of ${results.length} pages not found for ${input}\n`
      pagesNotFound.forEach((e) => { notFoundMsg += (yellowOnBlack(e.url) + '\n') })
      text += `\n${notFoundMsg}`
    }
    if (pagesError.length !== 0) {
      var errorMsg = `${pagesError.length} out of ${results.length} pages threw error while validating for ${input}\n`
      pagesError.forEach((e) => { errorMsg += redOnBlack(e.url) + '\n' })
      text += `\n${errorMsg}`
    }
    if (pagesFail.length !== 0) {
      var failMsg = `${redOnBlack('Site Failed Validation')}` +
                    `\n${pagesFail.length} out of ${results.length} pages failed validation for ${input}\n`
      pagesFail.forEach((e) => { failMsg += redOnBlack(e.url) + '\n' })
      text += `\n${failMsg}`
    }
  }
  return text
}
