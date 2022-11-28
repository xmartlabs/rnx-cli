import { GluegunTemplate } from 'gluegun/build/types/toolbox/template-types'

import { reactNavigationConfig } from './config'
import { GluegunToolbox } from 'gluegun'
import { OperationKey, Result, ResultType, YesOrNoChoice } from '../types'
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
import { strings as Localize } from '../strings'
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types'

const QUESTION_KEY = 'reactNavigation'

export const generateReactNavigationBoilerplate = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  prompt: GluegunToolbox['prompt']
): Promise<Result<YesOrNoChoice>> => {
  const askForReactNavigation: PromptOptions = {
    type: 'select',
    name: QUESTION_KEY,
    message: Localize.Navigation.Ask.Config,
    choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
  }

  const askResult = await prompt.ask(askForReactNavigation)
  const wantsReactNavigation = askResult[QUESTION_KEY] === YesOrNoChoice.Yes

  if (wantsReactNavigation) {
    await handleOperation(
      projectName,
      OperationKey.InstallReactNavigation,
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
  highlight(red(bold(Localize.Navigation.DontForget)))
  printLineBreak()
  printInfo(Localize.Navigation.AddCode(green(underline('MainActivity'))))
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
  printInfo(Localize.Navigation.makeSure)
  printLineBreak()
  printInfo(`${blue('import ')} ${white('android.os.Bundle;')}`)
  printLineBreak()
}
