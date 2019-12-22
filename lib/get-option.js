'use strict'

module.exports = (orderedKeys, argv) => {
  for (const key of orderedKeys) {
    if (argv[key] !== undefined) {
      return argv[key]
    }
  }
  return false
}
