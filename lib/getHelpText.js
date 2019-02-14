'use strict';

module.exports = () => {
  const clc = require('cli-color');
  var cyan_on_black = clc.xterm(14).bgXterm(0);
  var yellow_on_black = clc.xterm(11).bgXterm(0);
  var help_msg =
  [
    cyan_on_black("site-validator-cli help:"),
    "-h or -help to get this message",
    yellow_on_black("$ site-validator -h"),
    "-v to get version number",
    yellow_on_black("$ site-validator -v"),
    "Usage:",
    yellow_on_black("$ site-validator <url>"),
    "Get full result from validator use --verbose",
    yellow_on_black("$ site-validator <url> --verbose"),
    "Get errors only (exclude warnings), use --quiet",
    yellow_on_black("$ site-validator <url> --quiet"),
    "Use caching (in minutes)",
    yellow_on_black("$ site-validator <url> --cacheTime <minutes>")
  ];
  return help_msg.join("\n\n");
}
