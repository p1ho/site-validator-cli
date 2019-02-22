'use strict'

const { existsSync } = require('fs')

module.exports = path => {
  return existsSync(path)
}
