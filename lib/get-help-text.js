'use strict'

module.exports = () => {
  const { blackBG, cyan, yellow, white } = require('./clc')
  var helpMsg =
  [
    cyan(' ________________________________ '),
    cyan('|                                |'),
    cyan('|       site-validator-cli       |'),
    cyan('|________________________________|'),
    '',
    white('Get Help ') + yellow('$ site-validator -h'),
    white('Get Ver. ') + yellow('$ site-validator -v'),
    '',
    white('Usage: enter url or path to a file (json/txt) that contains urls'),
    yellow('$ site-validator <url-or-path-to-file>'),
    white('Expected json format'),
    cyan('[                               '),
    cyan('  "https://example.com/"        '),
    cyan('  "https://example.com/about"   '),
    cyan('  "https://example.com/projects"'),
    cyan(']                               '),
    white('Expected txt format'),
    cyan('https://example.com/            '),
    cyan('https://example.com/about       '),
    cyan('https://example.com/projects    '),
    '',
    white('Options'),
    white('Fast-Fail ') + yellow('$ site-validator <url> --ff ') + white(' stops on first validation error'),
    white('Verbose   ') + yellow('$ site-validator <url> --verbose ') + white(' displays full results'),
    white('Quiet     ') + yellow('$ site-validator <url> --quiet ') + white(' exclude warnings'),
    white('Cache     ') + yellow('$ site-validator <url> --cacheTime <minutes> ') + white(' caches results temporarily'),
    '',
    white('You can chain options in any order'),
    yellow('$ site-validator <url> --verbose --quiet --cacheTime <minutes>'),
    '',
    white('If it is more convenient, you can add the url or path at the end'),
    yellow('$ site-validator --verbose --quiet --url <url>'),
    yellow('$ site-validator --verbose --quiet --file <path-to-file>'),
    ''
  ]
  var colorCount = [1, 1, 1, 1, 0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 3, 3, 3, 0, 1, 1, 0, 1, 1, 1, 0]
  var longestLine = helpMsg.reduce((a, b) => { return a.length > b.length ? a : b })
  return blackBG(helpMsg.map((x, i) => {
    return ' ' + x + ' '.repeat(longestLine.length - x.length - 20 + 10 * colorCount[i])
  }).join('\n'))
}
