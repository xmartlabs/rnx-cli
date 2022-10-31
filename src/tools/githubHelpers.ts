import execa from 'execa'
import { GluegunTemplate, GluegunToolbox } from 'gluegun'
import { Operations, Result, ResultType, YesOrNoChoice } from '../types'
import { INDENT } from './interfaceHelpers'
import { handleOperation } from './util'

const REPO_QUESTION_KEY = 'hasARepo'
const URL_QUESTION_KEY = 'repoUrl'

const askForIfHasRepo = {
  type: 'select',
  name: REPO_QUESTION_KEY,
  message: INDENT + 'Do you have a repository for the project?',
  choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
}

const askForUrlRepo = {
  type: 'input',
  name: URL_QUESTION_KEY,
  message: INDENT + 'What its the repository url to clone it?',
}

export const addGithubConfiguration = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  prompt: GluegunToolbox['prompt']
): Promise<Result> => {
  try {
    const repoAnswer = await prompt.ask(askForIfHasRepo)
    const hasARepo = repoAnswer[REPO_QUESTION_KEY] === YesOrNoChoice.Yes

    if (repoAnswer[REPO_QUESTION_KEY] === YesOrNoChoice.Yes) {
      const repoUrl = await prompt.ask(askForUrlRepo)

      const url = repoUrl[URL_QUESTION_KEY]
      const temporaryDirectory = new Date().getTime()

      await execa.command(`git clone ${url} ./${temporaryDirectory}`)

      await execa.command(`mv ./${temporaryDirectory}/.git ./${projectName}`)

      await execa.command(`rm -rf ./${temporaryDirectory}`)
    }

    await handleOperation(Operations.AddGitConfigFiles, async () => {
      try {
        await Promise.all([
          generate({
            template: './githubConfig/pull_request_template.md',
            target: `./${projectName}/.github/pull_request_template.md`,
          }),
          generate({
            template: './githubConfig/pre-push',
            target: `./${projectName}/.github/hooks/pre-push`,
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
          // TODO: Display Message like React Navigation to show that they need to run these command
        }
        return {
          type: ResultType.Success,
        }
      } catch (error) {
        return {
          type: ResultType.Fail,
          message: 'Error adding pre-push hooks.',
        }
      }
    })

    return { type: ResultType.Success }
  } catch (error) {
    return {
      type: ResultType.Fail,
      message: 'Error adding pre-push hooks.',
    }
  }
}
