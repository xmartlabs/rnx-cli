import { GluegunTemplate } from 'gluegun/build/types/toolbox/template-types'

import { reactNavigationConfig } from './config'
import { GluegunToolbox, print } from 'gluegun'
import { Operations, Result, ResultType, YesOrNoChoice } from '../types'
import { handleOperation, installDependencies } from './util'
import execa from 'execa'
import { INDENT } from './interfaceHelpers'

const QUESTION_KEY = 'reactNavigation'

const askForReactNavigation = {
  type: 'select',
  name: QUESTION_KEY,
  message: INDENT + 'Do you want to add React Navigation base config?',
  choices: [YesOrNoChoice.Yes, YesOrNoChoice.No],
}

export const generateReactNavigationBoilerplate = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  prompt: GluegunToolbox['prompt']
): Promise<Result<YesOrNoChoice>> => {
  try {
    const askResult = await prompt.ask(askForReactNavigation)
    const wantsReactNavigation = askResult[QUESTION_KEY] === YesOrNoChoice.Yes

    if (wantsReactNavigation) {
      await handleOperation(Operations.InstallReactNavigation, async () => {
        try {
          await installDependencies(
            projectName,
            false,
            reactNavigationConfig.dependencies.join(' ')
          )

          for await (const configFile of reactNavigationConfig.configurationFiles) {
            generate({
              template: `./reactNavigation/${configFile.template}`,
              target: `./${projectName}/${configFile.target}`,
            })
          }

          await execa.command(`rm -rf App.tsx`, {
            cwd: `${process.cwd()}/${projectName}`,
          })

          await generate({
            template: `./baseScene/index.txt`,
            target: `./${projectName}/src/scenes/welcome/index.tsx`,
          })

          await generate({
            template: `./baseScene/styles.txt`,
            target: `./${projectName}/src/scenes/welcome/styles.ts`,
          })

          postInstallHelper()

          return {
            type: ResultType.Success,
          }
        } catch (error) {
          return {
            type: ResultType.Fail,
            message: 'Error installing React Navigation',
          }
        }
      })
    }

    return {
      type: ResultType.Success,
      payload: askResult[QUESTION_KEY] as YesOrNoChoice,
    }
  } catch (error) {
    return {
      type: ResultType.Fail,
      message: 'Error generating configuration files',
    }
  }
}

export const postInstallHelper = (): void => {
  const { red, green, blue, yellow, white, bold, underline } = print.colors
  const space = () => print.info('')

  space()
  space()
  print.highlight(red(bold('DONT FORGET TO MODIFY THIS IN ANDROID!')))
  space()
  print.info(
    `Add the following code to the body of ${green(
      underline('MainActivity')
    )} class:`
  )
  space()
  print.info(
    `
    ${green('@Override')}
    ${blue('protected')} ${green('void')} ${yellow('onCreate')}(${green(
      'Bundle'
    )} ${white('savedInstanceState')}) {
      ${blue('super')}.${yellow('onCreate')}(${blue('null')});
    }
  `
  )
  space()
  print.info(
    `and make sure to add an import statement at the top of this file:`
  )
  space()
  print.info(`${blue('import ')} ${white('android.os.Bundle;')}`)
  space()
  space()
}
