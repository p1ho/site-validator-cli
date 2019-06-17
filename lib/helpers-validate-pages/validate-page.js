'use strict'

module.exports = async (page, quiet, isLocal) => {
  const validator = require('html-validator')
  const isNotFound = require('./is-not-found')
  const parseData = require('./parse-data')
  let result = {
    url: page,
    status: undefined,
    errors: []
  }
  try {
    let data = await validator({ url: page, isLocal: isLocal })
    let dataParsed = JSON.parse(data)
    if (isNotFound(dataParsed)) {
      result.status = 'not found'
    } else {
      var errors
      if (quiet) {
        errors = parseData(dataParsed.messages.filter(m => m.type === 'error'))
      } else {
        errors = parseData(dataParsed.messages)
      }
      if (errors.length !== 0) {
        result.status = 'fail'
        result.errors = errors
      } else {
        result.status = 'pass'
      }
    }
  } catch (error) {
    result.status = 'error'
    result.errors.push(error)
  }
  return result
}
