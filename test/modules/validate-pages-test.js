const test = require('ava')
const validatePages = require('../../lib/validate-pages')
const urls = {
  pass: 'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  warning: 'https://p1ho.github.io/site-validator-cli/test/data/site/page_warning.html',
  fail: 'https://p1ho.github.io/site-validator-cli/test/data/site/page_fail.html',
  notFound: 'http://please-do-not-register-this-domain.com/'
}
const options = {
  isLocal: false,
  quiet: false,
  verbose: false,
  failfast: false
}

test('get single result', async (t) => {
  let results = await validatePages([urls.pass], options)
  t.true(results[0].url === urls.pass)
  t.true(results[0].status === 'pass')
  t.true(results[0].errors.length === 0)

  results = await validatePages([urls.warning], options)
  t.true(results[0].url === urls.warning)
  t.true(results[0].status === 'fail')
  t.true(results[0].errors.length === 1)

  results = await validatePages([urls.fail], options)
  t.true(results[0].url === urls.fail)
  t.true(results[0].status === 'fail')
  t.true(results[0].errors.length === 2)

  results = await validatePages([urls.notFound], options)
  t.true(results[0].url === urls.notFound)
  t.true(results[0].status === 'not found')
  t.true(results[0].errors.length === 0)
})

test('get multiple results (cannot test order)', async (t) => {
  let urlList = [
    'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
    'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
    'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html'
  ]

  let results = await validatePages(urlList, options)
  results.forEach(e => {
    t.true(urlList.includes(e.url))
    t.true(e.status === 'pass')
    t.true(e.errors.length === 0)
  })

  results = await validatePages(Object.values(urls), options)
  results.forEach(e => {
    t.true(Object.values(urls).includes(e.url))
    // these cases were tested manually, and thus hardcoded here
    if (e.status === 'pass' || e.status === 'not found') {
      t.true(e.errors.length === 0)
    } else {
      if (e.errors.length === 1) {
        t.true(e.errors[0].type === 'warning')
      } else {
        t.true(e.errors[0].type === 'error')
        t.true(e.errors[1].type === 'error')
      }
    }
  })
})
