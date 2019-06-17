const test = require('ava')
const parseData = require('../../../lib/helpers-validate-pages/parse-data')

test('parse result from empty input', t => {
  t.deepEqual(parseData([]), [])
})

test('parse result from some input', t => {
  t.deepEqual(parseData([{
    type: 'error',
    message: 'some message',
    firstLine: 1,
    firstColumn: 1
  }]), [{
    type: 'error',
    message: 'some message',
    location: 'From line 1, column 1; to line 1, column 1'
  }])

  t.deepEqual(parseData([{
    type: 'info',
    subType: 'warning',
    message: 'some message',
    firstLine: 1,
    firstColumn: 1
  }]), [{
    type: 'warning',
    message: 'some message',
    location: 'From line 1, column 1; to line 1, column 1'
  }])

  t.deepEqual(parseData([{
    type: 'info',
    subType: 'warning',
    message: 'some message',
    firstLine: 1,
    lastLine: 2,
    firstColumn: 1
  }]), [{
    type: 'warning',
    message: 'some message',
    location: 'From line 1, column 1; to line 2, column 1'
  }])

  t.deepEqual(parseData([{
    type: 'info',
    subType: 'warning',
    message: 'some message',
    lastLine: 2,
    firstColumn: 1,
    lastColumn: 3
  }]), [{
    type: 'warning',
    message: 'some message',
    location: 'From line 2, column 1; to line 2, column 3'
  }])
})
