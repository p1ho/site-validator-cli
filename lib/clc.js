const clc = require('cli-color')

module.exports.greenOnBlack = clc.xterm(47).bgBlack
module.exports.redOnBlack = clc.xterm(196).bgBlack
module.exports.yellowOnBlack = clc.xterm(11).bgBlack
module.exports.cyanOnBlack = clc.xterm(14).bgBlack
module.exports.blackBG = clc.bgBlack
module.exports.blackOnYellow = clc.black.bgYellowBright
module.exports.whiteOnRed = clc.whiteBright.bgXterm(124)
module.exports.cyan = clc.xterm(14)
module.exports.yellow = clc.xterm(11)
module.exports.white = clc.whiteBright
