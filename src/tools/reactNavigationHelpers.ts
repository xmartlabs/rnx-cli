import { GluegunTemplate } from 'gluegun/build/types/toolbox/template-types'

import { reactNavigationConfig } from './config'
import { GluegunToolbox } from 'gluegun'
import { Operations, Result, ResultType, YesOrNoChoice } from '../types'
import { handleOperation, installDependencies } from './util'
import execa from 'execa'
import {
  blue,
  bold,
  green,
  highlight,
  printInfo,
  printLineBreak,
  red,
  underline,
  white,
  yellow,
} from './interfaceHelpers'

const QUESTION_KEY = 'reactNavigation'

const askForReactNavigation = {
  type: 'select',
  name: QUESTION_KEY,
  message: 'Do you want to add React Navigation base config?',
  choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
}

export const generateReactNavigationBoilerplate = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  prompt: GluegunToolbox['prompt']
): Promise<Result<YesOrNoChoice>> => {
  const askResult = await prompt.ask(askForReactNavigation)
  const wantsReactNavigation = askResult[QUESTION_KEY] === YesOrNoChoice.Yes

  if (wantsReactNavigation) {
    await handleOperation(
      projectName,
      Operations.InstallReactNavigation,
      async () => {
        await installDependencies(
          projectName,
          false,
          reactNavigationConfig.dependencies.join(' ')
        )

        for await (const configFile of reactNavigationConfig.configurationFiles) {
          generate({
            template: `reactNavigation/${configFile.template}`,
            target: `./${projectName}/${configFile.target}`,
          })
        }

        await regenerateAppTsxAndAddBaseScene(projectName, generate)

        postInstallHelper()
      }
    )
  }
  return { type: ResultType.Success, payload: YesOrNoChoice.Yes }
}

const regenerateAppTsxAndAddBaseScene = async (
  projectName: string,
  generate: GluegunTemplate['generate']
) => {
  await execa.command(`rm -rf App.tsx`, {
    cwd: `${process.cwd()}/${projectName}`,
  })

  await generate({
    template: `baseScene/index.txt`,
    target: `./${projectName}/src/scenes/welcome/index.tsx`,
  })

  await generate({
    template: `baseScene/styles.txt`,
    target: `./${projectName}/src/scenes/welcome/styles.ts`,
  })
}

const postInstallHelper = (): void => {
  printLineBreak()
  highlight(red(bold('DONT FORGET TO MODIFY THIS IN ANDROID!')))
  printLineBreak()
  printInfo(
    `Add the following code to the body of ${green(
      underline('MainActivity')
    )} class:`
  )
  printLineBreak()
  printInfo(
    `
    ${green('@Override')}
    ${blue('protected')} ${green('void')} ${yellow('onCreate')}(${green(
      'Bundle'
    )} ${white('savedInstanceState')}) {
      ${blue('super')}.${yellow('onCreate')}(${blue('null')});
    }
  `
  )
  printLineBreak()
  printInfo(`and make sure to add an import statement at the top of this file:`)
  printLineBreak()
  printInfo(`${blue('import ')} ${white('android.os.Bundle;')}`)
  printLineBreak()
}
