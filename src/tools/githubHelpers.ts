import execa from 'execa'
import { GluegunTemplate, GluegunToolbox } from 'gluegun'
import process from 'process'
import { Operations, YesOrNoChoice } from '../types'
import {
  bold,
  highlight,
  printInfo,
  printLineBreak,
  red,
} from './interfaceHelpers'
import { handleOperation } from './util'

const REPO_QUESTION_KEY = 'hasARepo'
const URL_QUESTION_KEY = 'repoUrl'

const askForIfHasRepo = {
  type: 'select',
  name: REPO_QUESTION_KEY,
  message: 'Do you have a repository for the project?',
  choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
}

const askForUrlRepo = {
  type: 'input',
  name: URL_QUESTION_KEY,
  message: 'What its the repository url to clone it?',
}

export const addGithubConfiguration = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  prompt: GluegunToolbox['prompt']
) => {
  const repoAnswer = await prompt.ask(askForIfHasRepo)
  const hasARepo = repoAnswer[REPO_QUESTION_KEY] === YesOrNoChoice.Yes

  if (repoAnswer[REPO_QUESTION_KEY] === YesOrNoChoice.Yes) {
    await handleOperation(
      projectName,
      Operations.CloneRepoAndMoveProject,
      async () =>
        cloneRepoAndMoveProject(
          repoAnswer[REPO_QUESTION_KEY],
          projectName,
          prompt
        )
    )
  }

  await handleOperation(projectName, Operations.AddGitConfigFiles, async () =>
    generateConfigFiles(generate, projectName, hasARepo)
  )
}

const cloneRepoAndMoveProject = async (
  hasARepoResponse: string,
  projectName: string,
  prompt: GluegunToolbox['prompt']
) => {
  if (hasARepoResponse === YesOrNoChoice.Yes) {
    const repoUrl = await prompt.ask(askForUrlRepo)

    const url = repoUrl[URL_QUESTION_KEY]
    const temporaryDirectory = new Date().getTime()

    await execa.command(`git clone ${url} ./${temporaryDirectory}`)

    await execa.command(`mv ./${temporaryDirectory}/.git ./${projectName}`)

    await execa.command(`rm -rf ./${temporaryDirectory}`)
  }
}

const generateConfigFiles = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  hasARepo: boolean
): Promise<void> => {
  await Promise.all([
    generate({
      template: 'githubConfig/pull_request_template.md',
      target: `${projectName}/.github/pull_request_template.md`,
    }),
    generate({
      template: 'githubConfig/pre-push',
      target: `${projectName}/.github/hooks/pre-push`,
    }),
  ])

  await execa.command(`chmod +x .github/hooks/pre-push`, {
    cwd: `${process.cwd()}/${projectName}`,
  })

  if (hasARepo) {
    await execa.command(`git config core.hooksPath .github/hooks`, {
      cwd: `${process.cwd()}/${projectName}`,
    })
  } else {
    postInstallHelper()
  }
}

const postInstallHelper = (): void => {
  printLineBreak()
  printLineBreak()
  highlight(red(bold('DONT FORGET TO SETUP YOUR GIT HOOKS RUNNING')))
  printLineBreak()
  printInfo('git config core.hooksPath .github/hooks')
  printLineBreak()
  printInfo('In your project repository folder')
  printLineBreak()
  printLineBreak()
}
