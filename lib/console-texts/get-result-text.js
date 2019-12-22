'use strict'

const { greenOnBlack, redOnBlack, blackOnYellow, whiteOnRed, red, yellow } = require('../clc')

module.exports = (result, verbose) => {
  let text = ''
  switch (result.status) {
    case 'not found':
      text += `${redOnBlack('MISS ')}──  ${redOnBlack(result.url)}`
      break
    case 'fail':
      text += `${redOnBlack('FAIL ')}──  ${redOnBlack(result.url)}`
      break
    case 'pass':
      text += `${greenOnBlack('PASS ')}──  ${greenOnBlack(result.url)}`
      break
    case 'error':
      text += `${redOnBlack('ERROR')}──  ${redOnBlack(result.url)}`
      break
  }
  if (verbose) {
    text += '\n'
    for (const error of result.errors) {
      if (typeof error === 'string' || (typeof error === 'object' && error.type === undefined)) {
        text += `${whiteOnRed(error)}\n`
        text += `${red('───────────────────────────────────────────────────────────')}\n`
      } else {
        if (error.type === 'error') {
          text += `${whiteOnRed(error.type.toUpperCase())} ${error.location}\n`
          text += `${error.message}\n`
          text += `${red('───────────────────────────────────────────────────────────')}\n`
        } else {
          text += `${blackOnYellow(error.type.toUpperCase())} ${error.location}\n`
          text += `${error.message}\n`
          text += `${yellow('───────────────────────────────────────────────────────────')}\n`
        }
      }
    }
  }
  return text
}
