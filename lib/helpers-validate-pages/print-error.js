'use strict'

const { blackOnYellow, whiteOnRed, red, yellow } = require('../clc')

module.exports = (errors) => {
  for (let error of errors) {
    if (error.type === 'error') {
      console.log(whiteOnRed(`${error.type.toUpperCase()}`) + ' ' + error.location)
      console.log(error.message)
      console.log(red('───────────────────────────────────────────────────────────'))
    } else {
      console.log(blackOnYellow(`${error.type.toUpperCase()}`) + ' ' + error.location)
      console.log(error.message)
      console.log(yellow('───────────────────────────────────────────────────────────'))
    }
  }
}
