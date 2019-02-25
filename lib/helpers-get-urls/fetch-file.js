'use strict'

const parseFile = require('./parse-file')

module.exports = (url) => {
  return new Promise(async function (resolve, reject) {
    const protocol = /^(https)/.test(url) ? 'https' : 'http'
    const http = require(protocol)

    console.log(`\nFetching ${url} ...`)
    var data = ''
    var fileType = url.toLowerCase().split('.').pop()
    http.get(url, (resp) => {
      var status = resp.statusCode
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        try {
          if (status !== 200) {
            throw new Error(`Server responded with status code ${status}`)
          }
          console.log('\nFile fetched successfully')
          var urls = parseFile(fileType, data)
          return resolve(urls)
        } catch (error) {
          reject(error)
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}
