const fs = require('fs')
const chalk = require('chalk')
var Analytics = require('analytics-node')
const readline = require('readline')
const Consts = require('./consts')
const figlet = require('figlet')
const clear = require('clear')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
// const chalkRainbow = require('chalk-rainbow')
const analytics = new Analytics('PlK0f8GUkINbFgSoXdQSjdKdhi9Hkdqr')
const uuid = uuidv4()

const clean = () => {

    clear()

    console.log(chalk.bold.green(figlet.textSync(Consts.CLITitle, { kerning: 'fitted', horizontalLayout: 'default' })))

    console.log(chalk.italic('         You wrote history, now frame it.'))

    console.log(' ')

}


/** 
 * List all dirs in current local directory  
 */
const isGitRepo = async (dir = process.cwd()) => {

    const filesAndDirs = await fs.promises.readdir(dir, { withFileTypes: true })

    return filesAndDirs.filter(dirent => dirent.isDirectory() && dirent.name === '.git')

}

const currentDirName = () => path.basename(process.cwd())


const printError = (error) => console.log(chalk.red.bold(error))


const trackEvent = (event, data) => {

    const NODE_ENV = process.env.NODE_ENV || 'prod'

    const eventFullName = `${NODE_ENV}:${event}`

    analytics.track({ event: eventFullName, anonymousId: uuid, properties: { data } })

    if (NODE_ENV !== 'prod') {
        const log = chalk.gray.italic(eventFullName)
        if (data) console.log(log, data); else console.log(log)
    }

}


const keypress = () => {

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    return new Promise(resolve => rl.question('', ans => {
        rl.close()
        resolve()
    }))

}


const workInProgressMessage = () => {

    clear()

    console.log(chalk.bold.red(figlet.textSync('Are you the chosen?', { horizontalLayout: 'default' })))

    console.log(chalk.italic("If you are seeing this message, it's because you somehow got access to the cli before the actual development is finished."))

    console.log(`Follow this link ${chalk.italic.blue('http://eepurl.com/g8qrS5')}, enter your email an the code ${chalk.bold.green(Math.round(Math.random() * 100000))}. You will receive a free canvas once the development is finished.`)

    console.log(' ')

    trackEvent('end', new Date().toISOString())

    process.exit(0)

}


module.exports = {

    clean,
    printError,
    isGitRepo,
    trackEvent,
    currentDirName,
    keypress,
    workInProgressMessage

}

