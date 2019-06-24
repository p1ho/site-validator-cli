'use strict'

module.exports = () => {
  const pkg = require('../../package.json')
  const { blackBG, cyan, yellow, white } = require('../clc')
  var helpMsg =
  [
    cyan('╔─────────────────────────────────╗'),
    cyan(`     site-validator-cli v${pkg.version}`),
    cyan('╚─────────────────────────────────╝'),
    '',
    white('Usage'),
    yellow('$ site-validator <url> | <path-to-file> [options]'),
    '',
    white('Options'),
    yellow('--page') + white(' validates url without crawling'),
    yellow('--ff') + white(' stops on first validation fail'),
    yellow('--verbose') + white(' displays errors'),
    yellow('--quiet') + white(' exclude info/warnings'),
    yellow('--local') + white(' validates localhost'),
    yellow('--cache <min>') + white(' cache time for sitemap'),
    yellow('--clear-cache') + white(' clears cached sitemaps'),
    yellow('--output <filename>') + white(' export report'),
    yellow('--view <filename>') + white(' print report'),
    '',
    white('Others'),
    white('Get Help ') + yellow('$ site-validator -h | help | --help'),
    white('Get Ver. ') + yellow('$ site-validator -v | version | --version'),
    '',
    white('File Content Guidelines'),
    white('File - json'),
    cyan('[                               '),
    cyan('  "https://example.com/"        '),
    cyan('  "https://example.com/about"   '),
    cyan('  "https://example.com/projects"'),
    cyan(']                               '),
    '',
    white('File - txt'),
    cyan('https://example.com/            '),
    cyan('https://example.com/about       '),
    cyan('https://example.com/projects    '),
    '',
    white('File - xml'),
    cyan('<?xml version="1.0" encoding="UTF-8"?>  '),
    cyan('<urlset>                                '),
    cyan('  <url>                                 '),
    cyan('    <loc>https://example.com/</loc>     '),
    cyan('  </url>                                '),
    cyan('  <url>                                 '),
    cyan('    <loc>https://example.com/about</loc>'),
    cyan('  </url>                                '),
    cyan('</urlset>                               '),
    ''
  ]
  var colorCount = [
    ...[1, 1, 1],
    0,
    ...[1, 1],
    0,
    ...[1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    0,
    ...[1, 2, 2],
    0,
    ...[1, 1, 1, 1, 1, 1, 1],
    0,
    ...[1, 1, 1, 1],
    0,
    ...[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    0,
  ]

  var longestLine = helpMsg.reduce((a, b) => { return a.length > b.length ? a : b })
  return blackBG(helpMsg.map((x, i) => {
    return ' ' + x + ' '.repeat(longestLine.length - 19 - x.length + 10 * colorCount[i])
  }).join('\n'))
}
