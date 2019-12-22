const test = require('ava')
const getResultText = require('../../../lib/console-texts/get-result-text')
const { greenOnBlack, redOnBlack, blackOnYellow, whiteOnRed, red, yellow } = require('../../../lib/clc')
const testResults = {
  'not-found': {
    status: 'not found',
    url: 'test-url',
    errors: []
  },
  fail: {
    status: 'fail',
    url: 'test-url',
    errors: [
      {
        type: 'error',
        message: 'this is an error message',
        location: 'this is the location of error'
      },
      {
        type: 'warning',
        message: 'this is a warning message',
        location: 'this is the location of warning'
      }
    ]
  },
  pass: {
    status: 'pass',
    url: 'test-url',
    errors: []
  },
  error: {
    status: 'error',
    url: 'test-url',
    errors: [
      'some error message',
      new Error('error message in an Error object')
    ]
  }
}

test('check return type is string', t => {
  t.true(typeof getResultText(testResults['not-found'], true) === 'string')
  t.true(typeof getResultText(testResults['not-found'], false) === 'string')
  t.true(typeof getResultText(testResults.fail, true) === 'string')
  t.true(typeof getResultText(testResults.fail, false) === 'string')
  t.true(typeof getResultText(testResults.pass, true) === 'string')
  t.true(typeof getResultText(testResults.pass, false) === 'string')
  t.true(typeof getResultText(testResults.error, true) === 'string')
  t.true(typeof getResultText(testResults.error, false) === 'string')
})

test('check text output (verbose off)', t => {
  var output
  output = `${redOnBlack('MISS ')}──  ${redOnBlack('test-url')}`
  t.deepEqual(getResultText(testResults['not-found'], false), output)

  output = `${redOnBlack('FAIL ')}──  ${redOnBlack('test-url')}`
  t.deepEqual(getResultText(testResults.fail, false), output)

  output = `${greenOnBlack('PASS ')}──  ${greenOnBlack('test-url')}`
  t.deepEqual(getResultText(testResults.pass, false), output)

  output = `${redOnBlack('ERROR')}──  ${redOnBlack('test-url')}`
  t.deepEqual(getResultText(testResults.error, false), output)
})

test('check text output (verbose on)', t => {
  var output
  output = `${redOnBlack('MISS ')}──  ${redOnBlack('test-url')}\n`
  t.deepEqual(getResultText(testResults['not-found'], true), output)

  output = `${redOnBlack('FAIL ')}──  ${redOnBlack('test-url')}\n`
  output += `${whiteOnRed('ERROR')} this is the location of error\n`
  output += 'this is an error message\n'
  output += `${red('───────────────────────────────────────────────────────────')}\n`
  output += `${blackOnYellow('WARNING')} this is the location of warning\n`
  output += 'this is a warning message\n'
  output += `${yellow('───────────────────────────────────────────────────────────')}\n`
  t.deepEqual(getResultText(testResults.fail, true), output)

  output = `${greenOnBlack('PASS ')}──  ${greenOnBlack('test-url')}\n`
  t.deepEqual(getResultText(testResults.pass, true), output)

  output = `${redOnBlack('ERROR')}──  ${redOnBlack('test-url')}\n`
  output += `${whiteOnRed('some error message')}\n`
  output += `${red('───────────────────────────────────────────────────────────')}\n`
  output += `${whiteOnRed(new Error('error message in an Error object'))}\n`
  output += `${red('───────────────────────────────────────────────────────────')}\n`
  t.deepEqual(getResultText(testResults.error, true), output)
})
