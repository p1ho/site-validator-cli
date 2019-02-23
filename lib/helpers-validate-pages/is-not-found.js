'use strict'

module.exports = (result) => {
  try {
    return result.messages[0].type === 'non-document-error'
  } catch (error) {
    return false
  }
}
