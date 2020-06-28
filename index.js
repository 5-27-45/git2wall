#!/usr/bin/env node

const Questions = require('./questions')
const Consts = require('./consts')
const Utils = require('./utils')
const chalk = require('chalk')
const { trackEvent } = require('./utils')

process.on('SIGINT', async () => { await trackEvent('user_exit'); process.exit(0) })

const main = async () => {

    await Utils.trackEvent('start', new Date().toISOString())

    Utils.clean()

    // show intro message
    console.log(`${chalk.red('Hey!')} So you are a ${chalk.italic('badass')} developer and you choose the ${chalk.italic('hacky')} way, nice!`)
    console.log(`In just few steps you'll ${chalk.bold('preview')} and ${chalk.bold('ship')} your beautiful git repo history on a canvas.
    `)
    console.log(chalk.gray.italic('Press enter to continue'))
    await Utils.trackEvent('show_intro')

    // await input before continuing
    await Utils.keypress()
    await Utils.trackEvent('start_questions')

    Utils.clean()

    const projectType = await Questions.askForProjectType()
    if (projectType === Consts.ProjectTypes.PersonalProject) {

        // if we are not in a git repo, throw error and exit.
        if (!await Utils.isGitRepo()) {

            await Utils.trackEvent('not_in_git_repo')

            Utils.printError('This folder is a git repo 😩 Place yourself into a git repo and try again')

            process.exit(0)

        }

        await Utils.trackEvent('in_git_repo')

    } else {

        await Questions.askForFamousProjectName()

    }

    await Questions.askForProjectImportance()

    await Questions.askForPersonalPrintOrNot()

    await Questions.askForCopiesNumber()

    await Utils.workInProgressMessage()

}

main()