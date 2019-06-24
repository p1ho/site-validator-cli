const test = require('ava')
const fs = require('fs')
const exportOutput = require('../../../lib/output/export-output')

test('test output can be created and saved', t => {
  var results = []
  var options = {
    quiet: false,
    singlePage: false,
    output: 'test-url',
    path: 'test-url'
  }
  exportOutput(results, options)
  var pwd = process.cwd().replace(/\\/g, '/')
  t.true(fs.existsSync(`${pwd}/test-url.json`))
  fs.unlinkSync(`${pwd}/test-url.json`)
})
