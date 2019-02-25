const test = require('ava')
const fetchFile = require('../../../lib/helpers-get-urls/fetch-file')
const { arraysAreEqual } = require('../../../lib/test-helpers')
const expectedOutput = ['https://alheimsins.net/',
  'https://alheimsins.net/projects/',
  'https://alheimsins.net/changes/']

test('existing file can be fetched', async (t) => {
  var urlsFromJson = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json'))
  t.is(true, arraysAreEqual(urlsFromJson, expectedOutput))
  var urlsFromTxt = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.txt'))
  t.is(true, arraysAreEqual(urlsFromTxt, expectedOutput))
  var urlsFromXml = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/sitemap.xml'))
  t.is(true, arraysAreEqual(urlsFromXml, expectedOutput))
})

test('non existing files fails', async (t) => {
  var failed
  try {
    await (fetchFile('http://this-does-not-exist.com/urls.txt'))
  } catch (error) {
    failed = true
  }
  t.is(failed, true)
})

test('redirect fails (http -> https)', async (t) => {
  var failed
  try {
    await (fetchFile('http://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json'))
  } catch (error) {
    failed = true
  }
  t.is(failed, true)
})
