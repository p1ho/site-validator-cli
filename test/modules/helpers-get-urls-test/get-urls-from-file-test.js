const test = require('ava')
const getUrlsFromFile = require('../../../lib/helpers-get-urls/get-urls-from-file.js')
const expectedOutput = [
  'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html']

test('files can be found', t => {
  var urlsFromJson = getUrlsFromFile('test/data/urls.json')
  t.deepEqual(urlsFromJson, expectedOutput)

  var urlsFromTxt = getUrlsFromFile('test/data/urls.txt')
  t.deepEqual(urlsFromTxt, expectedOutput)

  var urlsFromXml = getUrlsFromFile('test/data/sitemap.xml')
  t.deepEqual(urlsFromXml, expectedOutput)
})

test('non-existent files throws error', t => {
  t.throws(() => {
    getUrlsFromFile('non-existent-file.txt')
  })
})
