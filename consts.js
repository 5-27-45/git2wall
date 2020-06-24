
const CLITitle = 'git2wall'

const ProjectTypes = {
    PersonalProject: 'personal_project',
    FamousProject: 'famous_project'
}

const FamousProjectOther = 'other'

const FamousProjects = [{
    name: 'Node.js',
    value: 'nodejs/node'
},
{
    name: 'React.js',
    value: 'facebook/react'
},
{
    name: 'TypeScript',
    value: 'microsoft/TypeScript'
},
{
    name: 'Kubernetes',
    value: 'kubernetes/kubernetes'
},
{
    name: 'React Native',
    value: 'facebook/react-native'
},
{
    name: 'Swift',
    value: 'apple/swift'
},
{
    name: 'Vue.js',
    value: 'vuejs/vue'
},
{
    name: 'Tensorflow',
    value: 'tensorflow/tensorflow'
},
{
    name: 'Bootstrap',
    value: 'twbs/bootstrap'
},
{
    name: 'Other...',
    value: FamousProjectOther
}]


module.exports = {

    CLITitle,
    ProjectTypes,
    FamousProjects,
    FamousProjectOther

}