const test = require('ava')
const getUrlsFromCrawler = require('../../../lib/helpers-get-urls/get-urls-from-crawler.js')
const expectedOutput = [
  'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html']
const unreferenced = 'https://p1ho.github.io/site-validator-cli/test/data/site/unreferenced.html'

test('urls are found (cache/debug set to false)', async (t) => {
  var urls = await getUrlsFromCrawler('https://p1ho.github.io/site-validator-cli/test/data/site/index.html', false, false)
  t.deepEqual(urls, expectedOutput)
  t.not(true, urls.includes(unreferenced))
})
