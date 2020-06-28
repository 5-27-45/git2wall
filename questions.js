const Consts = require('./consts')
const Utils = require('./utils')
const inquirer = require('inquirer')
const { prompt } = inquirer

const askForProjectType = async () => {

    await Utils.trackEvent('question_project_type')

    const { projectType } = await prompt([
        {
            message: 'What project would you like to print on canvas?',
            type: 'list',
            name: 'projectType',
            choices: [
                {
                    name: 'A personal project/repo',
                    value: Consts.ProjectTypes.PersonalProject
                },
                {
                    name: 'A famous project/repo (ex Node.js, React.js, Swift etc.)',
                    value: Consts.ProjectTypes.FamousProject
                }
            ]
        }
    ])

    await Utils.trackEvent('question_project_type_answer', projectType)

    return projectType

}

const askForFamousProjectName = async () => {

    await Utils.trackEvent('question_famous_project_name')

    const { projectName, repoURL } = await prompt([
        {
            message: 'Select the project from the ones below',
            type: 'list',
            name: 'projectName',
            choices: Consts.FamousProjects,
            pageSize: Consts.FamousProjects.length
        },
        {
            message: 'Enter the repo URL:',
            type: 'string',
            name: 'repoURL',
            when: (a) => a.projectName === Consts.FamousProjectOther,
            validate: (url) => {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url)
                    || 'You must provide a valid URL'
            }
        }

    ])

    await Utils.trackEvent('question_famous_project_name_answer', repoURL || projectName)

    return repoURL || projectName

}

const askForProjectImportance = async () => {

    await Utils.trackEvent('question_dimention')

    const { size } = await prompt([
        {
            message: 'How important is this project for you? Choose canvas size accordingly',
            type: 'list',
            name: 'size',
            choices: [
                {
                    name: 'Not so important                   | 10cm x 10cm   | 19.99$',
                    value: '1'
                },
                {
                    name: "There's a looot of work behind it. | 30cm x 30cm   | 25.00$",
                    value: '2'
                },
                {
                    name: "It's like a child for me.          | 100cm x 100cm | 36.00$",
                    value: '3'
                }
            ]
        }
    ])

    await Utils.trackEvent('question_dimention_answer', size)

    return size

}

const askForPersonalPrintOrNot = async () => {

    await Utils.trackEvent('question_scope')

    const { scope } = await prompt([
        {
            message: 'Who is this canvas for?',
            type: 'list',
            name: 'scope',
            choices: [
                {
                    name: 'Just for me',
                    value: 'me'
                },
                {
                    name: "For me an some friend/team mate",
                    value: 'me_and_team_mates'
                }
            ]
        }
    ])

    await Utils.trackEvent('question_scope_answer', scope)

    return scope

}

const askForCopiesNumber = async () => {

    await Utils.trackEvent('question_copies_number')

    const { copies } = await prompt([
        {
            message: 'How many copies of the canvas do you want to print?',
            type: 'string',
            name: 'copies',
            validate: (i) => {
                const n = parseInt(i)
                return (n && n > 0 && n < 100) || 'Nice try, but you must insert a positive number between 1 and 100'
            }
        }
    ])

    await Utils.trackEvent('question_copies_number_answer', copies)

    return copies

}

module.exports = {

    askForFamousProjectName,
    askForProjectImportance,
    askForCopiesNumber,
    askForProjectType,
    askForPersonalPrintOrNot

}