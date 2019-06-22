const test = require('ava')
const getUrlsFromFileOnline = require('../../../lib/helpers-get-urls/get-urls-from-file-online.js')
const expectedOutput = [
  'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html']

test('online files can be found (caching set to false)', async (t) => {
  var urlsFromJson = await getUrlsFromFileOnline('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.json', false, false)
  t.deepEqual(urlsFromJson, expectedOutput)

  var urlsFromTxt = await getUrlsFromFileOnline('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/urls.txt', false, false)
  t.deepEqual(urlsFromTxt, expectedOutput)

  var urlsFromXml = await getUrlsFromFileOnline('https://raw.githubusercontent.com/p1ho/site-validator-cli/master/test/data/sitemap.xml', false, false)
  t.deepEqual(urlsFromXml, expectedOutput)
})
