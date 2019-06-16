'use strict'

const { blackOnYellow, whiteOnRed } = require('../clc')

module.exports = (errors) => {
  for (let error of errors) {
    if (error.type === 'error') {
      console.log(`[${error.type.toUpperCase()}] ${error.location}\n` +
                  `${whiteOnRed(error.message)}\n`)
    } else {
      console.log(`[${error.type.toUpperCase()}] ${error.location}\n` +
                  `${blackOnYellow(error.message)}\n`)
    }
  }
}
