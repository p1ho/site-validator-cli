'use strict'
const exit = require('../exit')

module.exports = (pagesNotFound, pagesFail) => {
  if (pagesNotFound.length > 0 || pagesFail.length > 0) {
    exit('Fast Fail Mode: Site Failed Validation', true)
  }
}
