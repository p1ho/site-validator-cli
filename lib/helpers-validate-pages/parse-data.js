'use strict'

module.exports = (result) => {
  const parseError = (msg) => {
    var firstLine = msg.firstLine || msg.lastLine
    var lastLine = msg.lastLine || msg.firstLine
    var firstCol = msg.firstColumn || msg.lastColumn
    var lastCol = msg.lastColumn || msg.firstColumn
    return {
      type: msg.subType || msg.type,
      message: msg.message,
      location: `From line ${firstLine}, column ${firstCol}; ` +
                `to line ${lastLine}, column ${lastCol}`
    }
  }
  return result.map(parseError)
}
