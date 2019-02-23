'use strict'

module.exports = (result, quiet) => {
  var err = (quiet) ? result.messages.filter(m => m.type === 'error') : result.messages
  return err.length === 0
}
