import { GluegunParameters, GluegunPrint, GluegunToolbox } from 'gluegun'

import { CLIHeading, printLineBreak } from '../tools/interfaceHelpers'

import { YesOrNoChoice } from '../types'
import {
  generateBaseComponents,
  generateConfigurationFiles,
  generateBaseProjectStructure,
  installBaseDependencies,
  installIOSDependencies,
  installReactNative,
} from '../tools/initCommandHelpers'

import { addGithubConfiguration } from '../tools/githubHelpers'
import { generateReactNavigationBoilerplate } from '../tools/reactNavigationHelpers'

module.exports = {
  name: 'init',
  alias: ['i'],
  description: 'Create a new RN project',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { error },
      prompt,
    } = toolbox

    const { projectName } = validateParams(error, parameters)
    CLIHeading()

    await installReactNative(projectName)
    await addGithubConfiguration(generate, projectName, prompt)
    await installBaseDependencies(projectName)

    const result = await generateReactNavigationBoilerplate(
      generate,
      projectName,
      prompt
    )
    await installIOSDependencies(projectName)
    await generateConfigurationFiles(generate, projectName)
    await generateBaseProjectStructure(
      generate,
      projectName,
      result.payload === YesOrNoChoice.Yes
    )
    await generateBaseComponents(generate, projectName)

    process.exit(1)
  },
}

const validateParams = (
  error: GluegunPrint['error'],
  parameters: GluegunParameters
) => {
  const projectName = parameters.first

  if (!projectName) {
    printLineBreak()
    error('You miss the project name param.\n"For example: rnx-cli i MyApp"')
    printLineBreak()
    process.exit(1)
  }

  return {
    projectName,
  }
}
