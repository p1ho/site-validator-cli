const test = require('ava')
const fetchFile = require('../../../lib/helpers-get-urls/fetch-file')
const { arraysAreEqual } = require('../../../lib/test-helpers')

test('existing file can be fetched', async (t) => {
  var expectedOutput = ['https://alheimsins.net/',
    'https://alheimsins.net/projects/',
    'https://alheimsins.net/changes/']
  var urlsFromJson = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json'))
  t.is(true, arraysAreEqual(urlsFromJson, expectedOutput))
  var urlsFromTxt = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.txt'))
  t.is(true, arraysAreEqual(urlsFromTxt, expectedOutput))
  var urlsFromXml = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/sitemap.xml'))
  t.is(true, arraysAreEqual(urlsFromXml, expectedOutput))
})

test('redirection can still be fetched (http -> https)', async (t) => {
  var urls = await (fetchFile('http://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json'))
  t.is(urls, ['https://alheimsins.net/',
    'https://alheimsins.net/projects/',
    'https://alheimsins.net/changes/'])
})
