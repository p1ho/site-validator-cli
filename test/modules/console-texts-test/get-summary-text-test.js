const test = require('ava')
const getSummaryText = require('../../../lib/console-texts/get-summary-text')
const { greenOnBlack, redOnBlack, yellowOnBlack } = require('../../../lib/clc')
const input = 'test-url'
const testResults = [
  {
    status: 'not found',
    url: 'test-url-1',
    errors: []
  },
  {
    status: 'fail',
    url: 'test-url-2',
    errors: [
      {
        type: 'error',
        message: 'this is an error message',
        location: 'this is the location of error'
      }
    ]
  },
  {
    status: 'pass',
    url: 'test-url-3',
    errors: []
  },
  {
    status: 'error',
    url: 'test-url-4',
    errors: [
      'some error message'
    ]
  }
]

test('check return type is string', t => {
  t.true(typeof getSummaryText(input, testResults) === 'string')
})

test('check text output (has errors)', t => {
  var output = `\n\n1 out of 4 pages not found for test-url\n`
  output += `${yellowOnBlack('test-url-1')}\n`
  output += `\n\n1 out of 4 pages threw error while validating for test-url\n`
  output += `${redOnBlack('test-url-4')}\n`
  output += `\n\n${redOnBlack('Site Failed Validation')}\n`
  output += `1 out of 4 pages failed validation for test-url\n`
  output += `${redOnBlack('test-url-2')}\n`
  t.deepEqual(getSummaryText(input, testResults), output)
})

test('check text output (no error)', t => {
  var output = `\n\n${greenOnBlack('Site Validated')} No problems were found for test-url\n`
  t.deepEqual(getSummaryText(input, []), output)
  t.deepEqual(getSummaryText(input, [
    {
      status: 'pass',
      url: 'test-url-1',
      errors: []
    },
    {
      status: 'pass',
      url: 'test-url-2',
      errors: []
    }
  ]), output)
})
