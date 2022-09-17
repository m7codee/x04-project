const chalk = require('chalk')

const color = (text, color) => {
 return !color ? chalk.green(text): chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
 return !bgcolor ? chalk.green(text): chalk.bgKeyword(bgcolor)(text)
}

const logs = (text, color) => {
 return !color ? chalk.red('[ Syx ] ') + chalk.green(text): chalk.yellow('[ SYX ] ') + chalk.keyword(color)(text)
}

module.exports = {
 color,
 bgcolor,
 logs
}