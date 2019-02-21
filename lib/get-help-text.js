'use strict'

module.exports = () => {
  const clc = require('cli-color')
  var cyan = clc.xterm(14)
  var yellow = clc.xterm(11)
  var white = clc.xterm()
  var helpMsg =
  [
    cyan(' ________________________________ '),
    cyan('|                                |'),
    cyan('|       site-validator-cli       |'),
    cyan('|________________________________|'),
    '\n',
    'Get Help ' + yellow('$ site-validator -h'),
    'Get Ver. ' + yellow('$ site-validator -v'),
    '\n',
    'Usage: enter url or path to a file (json/txt) that contains urls',
    yellow('$ site-validator <url-or-path-to-file>'),
    'Expected json format:',
    cyan('[                               '),
    cyan('  "https://example.com/"        '),
    cyan('  "https://example.com/about"   '),
    cyan('  "https://example.com/projects"'),
    cyan(']                               '),
    'Expected txt format:',
    cyan('https://example.com/            '),
    cyan('https://example.com/about       '),
    cyan('https://example.com/projects    '),
    '\n',
    'Options',
    'Fast-Fail ' + yellow('$ site-validator <url> --ff ') + ' stops on first validation error',
    'Verbose   ' + yellow('$ site-validator <url> --verbose ') + ' displays full results',
    'Quiet     ' + yellow('$ site-validator <url> --quiet ') + ' exclude warnings',
    'Cache     ' + yellow('$ site-validator <url> --cacheTime <minutes> ') + ' caches results temporarily',
    '\n',
    'You can chain options in any order',
    yellow('$ site-validator <url> --verbose --quiet --cacheTime <minutes>'),
    '\n',
    'If it is more convenient, you can add the url or path at the end',
    yellow('$ site-validator --verbose --quiet --url <url>'),
    yellow('$ site-validator --verbose --quiet --file <path-to-file>'),
    '\n',
  ]
  return helpMsg.map( x => { return ' ' + x }).join('\n')
}
