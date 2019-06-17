const test = require('ava')
const validatePages = require('../../lib/validate-pages')
const urlList = [
  'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
  'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html'
]
const options = {
  isLocal: false,
  quiet: false,
  verbose: false,
  failfast: false
}

test('get single result', async (t) => {
  let results = await validatePages([urlList[0]], options)
  t.deepEqual(results, [{
    url: 'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
    status: 'pass',
    errors: []
  }])
})

test('get multiple results (cannot test order)', async (t) => {
  let results = await validatePages(urlList, options)
  results.forEach(e => {
    t.true(urlList.includes(e.url))
    t.deepEqual(e.status, 'pass')
    t.deepEqual(e.errors, [])
  })
})
