'use strict'

const fs = require('fs')
const path = require('path')

module.exports = () => {
  var cachePath = path.resolve(`${__dirname}/../cache`)
  // consulted SharpCoder's answer at
  // https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
  let deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file, index) {
        let curPath = path + '/' + file
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath)
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      })
      if (path !== cachePath) {
        fs.rmdirSync(path)
      }
    }
  }
  deleteFolderRecursive(cachePath)
  console.log(`\nCache cleared!`)
}
