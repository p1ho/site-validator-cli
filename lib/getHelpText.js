'use strict'

module.exports = () => {
  const clc = require('cli-color')
  var cyanOnBlack = clc.xterm(14).bgXterm(0)
  var yellowOnBlack = clc.xterm(11).bgXterm(0)
  var helpMsg =
  [
    cyanOnBlack('site-validator-cli help:'),
    '-h or -help to get this message',
    yellowOnBlack('$ site-validator -h'),
    '-v to get version number',
    yellowOnBlack('$ site-validator -v'),
    'Usage:',
    yellowOnBlack('$ site-validator <url>'),
    'Get full result from validator use --verbose',
    yellowOnBlack('$ site-validator <url> --verbose'),
    'Get errors only (exclude warnings), use --quiet',
    yellowOnBlack('$ site-validator <url> --quiet'),
    'Use caching (in minutes)',
    yellowOnBlack('$ site-validator <url> --cacheTime <minutes>')
  ]
  return helpMsg.join('\n\n')
}
