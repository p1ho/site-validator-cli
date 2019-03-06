'use strict'

module.exports = (msg, error = false) => {
  if (error) {
    console.error(msg)
    process.exit(1)
  } else {
    console.log(msg)
    process.exit(0)
  }
}
