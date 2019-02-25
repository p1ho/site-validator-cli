const test = require('ava')
const { readFileSync } = require('fs')
const parseFile = require('../../../lib/helpers-get-urls/parse-file')
const expectedOutput = ['https://alheimsins.net/',
  'https://alheimsins.net/projects/',
  'https://alheimsins.net/changes/']

test('well formed data stream can be parsed', t => {
  var dataFromJson = readFileSync('test/data/urls.json', 'utf-8').toString()
  var urlsFromJson = parseFile('json', dataFromJson)
  t.deepEqual(urlsFromJson, expectedOutput)

  var dataFromTxt = readFileSync('test/data/urls.txt', 'utf-8').toString()
  var urlsFromTxt = parseFile('txt', dataFromTxt)
  t.deepEqual(urlsFromTxt, expectedOutput)

  var dataFromXml = readFileSync('test/data/sitemap.xml', 'utf-8').toString()
  var urlsFromXml = parseFile('xml', dataFromXml)
  t.deepEqual(urlsFromXml, expectedOutput)
})

test('non-matching file type throws error', t => {
  t.throws(() => {
    var dataFromJson = readFileSync('../../data/urls.json', 'utf-8').toString()
    parseFile('xml', dataFromJson)
  })
})

test('unallowed filetype throws error', t => {
  t.throws(() => { parseFile('md', '') })
})

test('invalid/unallowed json format throws error', t => {
  t.throws(() => { parseFile('json', '[') })
  t.throws(() => { parseFile('json', '{}') })
  t.throws(() => { parseFile('json', '{"urls":["https://alheimsins.net/"]}') })
})

test('invalid/unallowed xml format throws error', t => {
  t.throws(() => { parseFile('xml', '?>') })
  var badXml = readFileSync('test/data/bad-xml.xml', 'utf-8').toString()
  t.throws(() => { parseFile('xml', badXml) })
})
