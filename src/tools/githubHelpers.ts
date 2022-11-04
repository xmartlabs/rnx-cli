import execa from 'execa'
import { GluegunTemplate, GluegunToolbox } from 'gluegun'
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types'
import process from 'process'
import { Localize } from '../i18n'
import { OperationKey, YesOrNoChoice } from '../types'
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

const askForIfHasRepo: PromptOptions = {
  type: 'select',
  name: REPO_QUESTION_KEY,
  message: Localize.Github.Ask.Repo,
  choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
}

const askForUrlRepo: PromptOptions = {
  type: 'input',
  name: URL_QUESTION_KEY,
  message: Localize.Github.Ask.Url,
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
      OperationKey.CloneRepoAndMoveProject,
      async () =>
        cloneRepoAndMoveProject(
          repoAnswer[REPO_QUESTION_KEY],
          projectName,
          prompt
        )
    )
  }

  await handleOperation(projectName, OperationKey.AddGitConfigFiles, async () =>
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
  highlight(red(bold(Localize.Github.DontForget())))
  printLineBreak()
  printInfo(Localize.Github.Command())
  printLineBreak()
  printInfo(Localize.Github.Repository())
  printLineBreak()
  printLineBreak()
}
