const test = require('ava')
const getUrlsFromCrawler = require('../../../lib/helpers-get-urls/get-urls-from-crawler.js')
const expectedOutput = [
  'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page_warning.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page_fail.html'
]
const unreferenced = 'https://p1ho.github.io/site-validator-cli/test/data/site/unreferenced.html'

test('urls are found (cache set to false)', async (t) => {
  var urls = await getUrlsFromCrawler('https://p1ho.github.io/site-validator-cli/test/data/site/index.html', false, false)
  urls.forEach(url => {
    t.true(expectedOutput.includes(url))
  })
  t.not(true, urls.includes(unreferenced))
})
