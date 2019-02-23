'use strict'

module.exports = (pagesNotFound, pagesFail) => {
  const clc = require('cli-color')
  var redOnBlack = clc.xterm(196).bgXterm(0)
  if (pagesNotFound.length > 0 || pagesFail.length > 0) {
    console.log(`\n${redOnBlack('Fast Fail Mode: Site Failed Validation')} \n`)
    process.exit(1)
  }
}
