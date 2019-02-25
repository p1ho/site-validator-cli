'use strict'
const { redOnBlack } = require('../clc')

module.exports = (pagesNotFound, pagesFail) => {
  if (pagesNotFound.length > 0 || pagesFail.length > 0) {
    console.error(`\n${redOnBlack('Fast Fail Mode: Site Failed Validation')}\n`)
    process.exit(1)
  }
}
