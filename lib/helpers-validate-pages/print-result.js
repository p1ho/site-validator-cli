'use strict'

const { greenOnBlack, redOnBlack, blackOnYellow, whiteOnRed, red, yellow } = require('../clc')

module.exports = (result, verbose) => {
  switch (result.status) {
    case 'not found':
      console.log(`${redOnBlack('MISS ')}──  ${redOnBlack(result.url)}`)
      break
    case 'fail':
      console.log(`${redOnBlack('FAIL ')}──  ${redOnBlack(result.url)}`)
      break
    case 'pass':
      console.log(`${greenOnBlack('PASS ')}──  ${greenOnBlack(result.url)}`)
      break
    case 'error':
      console.log(`${redOnBlack('ERROR')}──  ${redOnBlack(result.url)}`)
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
    console.log('') // creates padding for readability
  }
}
