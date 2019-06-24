'use strict'

module.exports = (orderedKeys, argv) => {
  for (let key of orderedKeys) {
    if (argv[key] !== undefined) {
      return argv[key]
    }
  }
  return false
}
