const { readFileSync } = require('fs')

module.exports = path => {
  try {
    readFileSync(path)
    return true
  } catch (error) {
    return false
  }
}
