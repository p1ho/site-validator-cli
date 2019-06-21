'use strict'

module.exports = () => {
  const pkg = require('../package.json')
  const { blackBG, cyan, yellow, white } = require('../clc')
  var helpMsg =
  [
    cyan('╔─────────────────────────────────╗'),
    cyan(`     site-validator-cli v${pkg.version}`),
    cyan('╚─────────────────────────────────╝'),
    '',
    white('Get Help    ') + yellow('$ site-validator -h'),
    white('Get Ver.    ') + yellow('$ site-validator -v'),
    white('Clean Cache ') + yellow('$ site-validator --clean-cache'),
    '',
    white('Usage: enter url or path to a local/online file (json/txt/xml) that contains urls'),
    yellow('$ site-validator <url-or-path-to-file>'),
    '',
    white('Expected json format'),
    cyan('[                               '),
    cyan('  "https://example.com/"        '),
    cyan('  "https://example.com/about"   '),
    cyan('  "https://example.com/projects"'),
    cyan(']                               '),
    '',
    white('Expected txt format'),
    cyan('https://example.com/            '),
    cyan('https://example.com/about       '),
    cyan('https://example.com/projects    '),
    '',
    white('Expected xml format'),
    cyan('<?xml version="1.0" encoding="UTF-8"?>  '),
    cyan('<urlset>                                '),
    cyan('  <url>                                 '),
    cyan('    <loc>https://example.com/</loc>     '),
    cyan('  </url>                                '),
    cyan('  <url>                                 '),
    cyan('    <loc>https://example.com/about</loc>'),
    cyan('  </url>                                '),
    cyan('</urlset>                               '),
    '',
    white('Options'),
    white('Page-Mode ') + yellow('--page ') + white(' validates url without crawling'),
    white('Fast-Fail ') + yellow('--ff ') + white(' stops on first validation error'),
    white('Verbose   ') + yellow('--verbose ') + white(' displays full results'),
    white('Quiet     ') + yellow('--quiet ') + white(' exclude warnings'),
    white('Local     ') + yellow('--local') + white(' validates localhost website'),
    white('Cache     ') + yellow('--cache <minutes> ') + white(' caches results temporarily'),
    white('Output    ') + yellow('--output <optional-filename>') + white(' export results to json'),
    '',
    white('You can chain options in any order'),
    yellow('$ site-validator <url> --verbose --quiet --cache <minutes>'),
    '',
    white('If it is more convenient, you can add the path at the end'),
    yellow('$ site-validator --verbose --quiet --path <url>'),
    ''
  ]
  var colorCount = [
    ...[1, 1, 1],
    0,
    ...[2, 2, 2],
    0,
    ...[1, 1],
    0,
    ...[1, 1, 1, 1, 1, 1],
    0,
    ...[1, 1, 1, 1],
    0,
    ...[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    0,
    ...[1, 3, 3, 3, 3, 3, 3, 3],
    0,
    ...[1, 1],
    0,
    ...[1, 1],
    0
  ]

  var longestLine = helpMsg.reduce((a, b) => { return a.length > b.length ? a : b })
  return blackBG(helpMsg.map((x, i) => {
    return ' ' + x + ' '.repeat(longestLine.length - x.length + 10 * colorCount[i])
  }).join('\n'))
}
