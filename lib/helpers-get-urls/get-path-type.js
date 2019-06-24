'use strict'

module.exports = (path) => {
  const { existsSync } = require('fs')
  var allowedFileType = ['txt', 'json', 'xml']
  var fileType = path.toLowerCase().split('.').pop()

  if (existsSync(path)) {
    return 'file'
  } else {
    if (allowedFileType.includes(fileType)) {
      return 'online-file'
    } else {
      return 'url'
    }
  }
}
