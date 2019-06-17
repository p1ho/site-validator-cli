const test = require('ava')
const validatePage = require('../../../lib/helpers-validate-pages/validate-page')
const urls = {
  pass: 'https://p1ho.github.io/site-validator-cli/test/data/site/index.html',
  warning: 'https://p1ho.github.io/site-validator-cli/test/data/site/page_warning.html',
  fail: 'https://p1ho.github.io/site-validator-cli/test/data/site/page_fail.html',
  notFound: 'http://please-do-not-register-this-domain.com/'
}

test('pages that should pass', async (t) => {
  let result = await validatePage(urls.pass, false, false)
  t.deepEqual(result, {
    url: urls.pass,
    status: 'pass',
    errors: []
  })

  result = await validatePage(urls.warning, true, false)
  t.deepEqual(result, {
    url: urls.warning,
    status: 'pass',
    errors: []
  })
})

test('pages that should fail', async (t) => {
  let result = await validatePage(urls.fail, false, false)
  t.true(result.url === urls.fail)
  t.true(result.status === 'fail')
  t.true(result.errors.length === 2)
  t.true(result.errors[0].type === 'error')
  t.true(result.errors[1].type === 'error')

  result = await validatePage(urls.warning, false, false)
  t.true(result.url === urls.warning)
  t.true(result.status === 'fail')
  t.true(result.errors.length === 1)
  t.true(result.errors[0].type === 'warning')
})

test('pages not found', async (t) => {
  let result = await validatePage(urls.notFound, false, false)
  t.deepEqual(result, {
    url: urls.notFound,
    status: 'not found',
    errors: []
  })
})
