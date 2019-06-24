const test = require('ava')
const validateOutput = require('../../../lib/output/validate-output')

test('output validation tests (should validate)', t => {
  var output = {
    url: 'some url',
    pages: ['some url'],
    quiet: false,
    singlePage: false,
    passed: true,
    results: {
      passed: [
        {
          url: 'some url',
          status: 'pass',
          errors: []
        }
      ],
      failed: []
    }
  }
  t.true(validateOutput(output))

  output = {
    url: 'some url',
    pages: ['some url', 'second url'],
    quiet: false,
    singlePage: false,
    passed: false,
    results: {
      passed: [
        {
          url: 'some url',
          status: 'pass',
          errors: []
        }
      ],
      failed: [
        {
          url: 'second url',
          status: 'fail',
          errors: [
            {}, {}, {} // some error objects
          ]
        }
      ]
    }
  }
  t.true(validateOutput(output))
})

test('output validation tests (should not validate)', t => {
  var output = {} // empty object
  t.false(validateOutput(output))

  output = {
    url: 'some url',
    pages: ['some url'],
    quiet: false,
    singlePage: false,
    passed: false
    // missing results
  }
  t.false(validateOutput(output))

  output = {
    url: 'some url',
    pages: ['some url', 'second url'],
    quiet: false,
    singlePage: false,
    passed: false,
    results: {} // missing 'passed' and 'failed'
  }
  t.false(validateOutput(output))

  output = {
    url: 'some url',
    pages: ['some url', 'second url'],
    quiet: false,
    singlePage: false,
    passed: false,
    results: {
      passed: [],
      failed: 'should be of type object'
    }
  }
  t.false(validateOutput(output))

  output = {
    url: 'some url',
    pages: ['some url', 'second url'],
    quiet: false,
    singlePage: false,
    passed: false,
    results: {
      passed: [],
      failed: [
        {
          url: 'string',
          status: 'string',
          errors: 'should be of type object'
        }
      ]
    }
  }
  t.false(validateOutput(output))
})
