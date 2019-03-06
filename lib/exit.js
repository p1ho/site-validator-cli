'use strict'

const { redOnBlack } = require('./clc')

module.exports = (msg, hasError = false) => {
  if (hasError) {
    console.error(`\n${redOnBlack(msg)}\n`)
    process.exit(1)
  } else {
    console.log(`\n${msg}\n`)
    process.exit(0)
  }
}
