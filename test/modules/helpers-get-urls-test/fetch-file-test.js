const test = require('ava')
const fetchFile = require('../../../lib/helpers-get-urls/fetch-file')
const expectedOutput = ['https://alheimsins.net/',
  'https://alheimsins.net/projects/',
  'https://alheimsins.net/changes/']

test('existing file can be fetched', async (t) => {
  var urlsFromJson = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json'))
  t.deepEqual(urlsFromJson, expectedOutput)
  var urlsFromTxt = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.txt'))
  t.deepEqual(urlsFromTxt, expectedOutput)
  var urlsFromXml = await (fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/sitemap.xml'))
  t.deepEqual(urlsFromXml, expectedOutput)
})

test('non existing server fails', async (t) => {
  await t.throwsAsync(async () => {
    await fetchFile('http://this-does-not-exist.com/urls.txt')
  })
})

test('existing server but non existing file fails', async (t) => {
  await t.throwsAsync(async () => {
    await fetchFile('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/does-not-exist.json')
  })
})

test('redirect fails (http -> https)', async (t) => {
  await t.throwsAsync(async () => {
    await fetchFile('http://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json')
  })
})
