'use strict'
const { redOnBlack } = require('../clc')
const exit = require('../exit')

module.exports = (pagesNotFound, pagesFail) => {
  if (pagesNotFound.length > 0 || pagesFail.length > 0) {
    exit(`\n${redOnBlack('Fast Fail Mode: Site Failed Validation')}\n`, true)
  }
}
