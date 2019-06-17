'use strict'

const { greenOnBlack, redOnBlack, blackOnYellow, whiteOnRed, red, yellow } = require('../clc')

module.exports = (result, verbose) => {
  switch (result.status) {
    case 'not found':
      console.log([redOnBlack('MISS'), result.url].join(' '))
      break
    case 'fail':
      console.log([redOnBlack('FAIL'), result.url].join(' '))
      break
    case 'pass':
      console.log([greenOnBlack('PASS'), result.url].join(' '))
      break
    case 'error':
      console.log([redOnBlack('ERROR'), result.url].join(' '))
      break
  }
  if (verbose) {
    for (let error of result.errors) {
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
  if (verbose) { console.log('') } // creates padding for readability
}
