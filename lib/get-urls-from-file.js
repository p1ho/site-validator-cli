const { readFileSync } = require('fs')

module.exports = path => {
  const fileType = path.toLowerCase().split('.').pop()
  const data = readFileSync(path, 'utf-8').toString()
  console.log(`\nGot urls from the ${fileType} file at ${path}`)
  return fileType === 'json' ? JSON.parse(data) : data.split(/\r?\n/)
}
