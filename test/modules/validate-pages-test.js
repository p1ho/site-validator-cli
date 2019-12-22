const test = require('ava')
const retry = require('async-retry')
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

const retryValidatePages = async (urls, options) => {
  return retry(async () => {
    const results = await validatePages(urls, options)
    results.forEach(res => {
      if (res.status === 'error') {
        const msg = `${res.url} was not fetched successfully, retrying...`
        console.error(msg)
        throw new Error(msg)
      }
    })
    return results
  }, {
    retries: 3,
    factor: 1
  })
}

test('get single result', async (t) => {
  let results

  results = await retryValidatePages([urls.pass], options)
  t.true(results[0].url === urls.pass)
  t.true(results[0].status === 'pass')
  t.true(results[0].errors.length === 0)

  results = await retryValidatePages([urls.warning], options)
  t.true(results[0].url === urls.warning)
  t.true(results[0].status === 'fail')
  t.true(results[0].errors.length === 1)

  results = await retryValidatePages([urls.fail], options)
  t.true(results[0].url === urls.fail)
  t.true(results[0].status === 'fail')
  t.true(results[0].errors.length === 2)

  results = await retryValidatePages([urls.notFound], options)
  t.true(results[0].url === urls.notFound)
  t.true(results[0].status === 'not found')
  t.true(results[0].errors.length === 0)
})

test('get multiple results (cannot test order)', async (t) => {
  const urlList = [
    'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
    'https://p1ho.github.io/site-validator-cli/test/data/site/page.html',
    'https://p1ho.github.io/site-validator-cli/test/data/site/from_page.html'
  ]
  let results

  results = await retryValidatePages(urlList, options)
  results.forEach(e => {
    t.true(urlList.includes(e.url))
    t.true(e.status === 'pass')
    t.true(e.errors.length === 0)
  })

  results = await retryValidatePages(Object.values(urls), options)
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
