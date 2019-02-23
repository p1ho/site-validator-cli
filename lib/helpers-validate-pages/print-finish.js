'use strict'

module.exports = (input, pagesTotal, pagesNotFound, pagesFail) => {
  const clc = require('cli-color')

  var greenOnBlack = clc.xterm(47).bgXterm(0)
  var redOnBlack = clc.xterm(196).bgXterm(0)
  var yellowOnBlack = clc.xterm(11).bgXterm(0)
  var cyanOnBlack = clc.xterm(14).bgXterm(0)

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
