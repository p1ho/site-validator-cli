'use strict'

module.exports = (result, options) => {
  const clc = require('cli-color')
  var blackOnRed = clc.xterm(15).bgXterm(124)
  var blackOnYellow = clc.xterm(0).bgXterm(11)

  const printError = (msg) => {
    var firstLine = msg.firstLine || msg.lastLine
    var lastLine = msg.lastLine || msg.firstLine
    var firstCol = msg.firstColumn || msg.lastColumn
    var lastCol = msg.lastColumn || msg.firstColumn

    var errorType = (msg.subType || msg.type).toUpperCase()

    if (msg.type === 'error') {
      console.log(`\n[${errorType}] From line ${firstLine}, column ${firstCol}; ` +
                  `to line ${lastLine}, column ${lastCol}`)
      console.log(blackOnRed(msg.message) + ' \n')
    } else {
      if (!options.quiet) {
        console.log(`\n[${errorType}] From line ${firstLine}, column ${firstCol}; ` +
                    `to line ${lastLine}, column ${lastCol}`)
        console.log(blackOnYellow(msg.message) + ' \n')
      }
    }
  }

  if (result.messages.length === 1) {
    printError(result.messages[0])
  } else {
    for (let error of result.messages) {
      printError(error)
    }
  }

}
