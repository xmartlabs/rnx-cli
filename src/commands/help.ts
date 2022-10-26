import { GluegunToolbox } from 'gluegun'
import {
  heading,
  CLIHeading,
  printCommand,
  printLineBreak,
  printInfo,
} from '../tools/interfaceHelpers'

module.exports = {
  dashed: true,
  alias: ['h'],
  description: 'Displays XL React Native CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox

    CLIHeading()

    printLineBreak()
    heading(`Welcome to XL React Native CLI ${meta.version()}!`)
    printLineBreak()
    printInfo('XL React Native CLI is a CLI that helps you spin up')
    printInfo('a new React Native project with all the minimal configuration')
    printInfo('needed and it without losing any time!')
    printLineBreak()

    heading('Commands')
    printLineBreak()
    printCommand('init            ', 'Creates a new React Native app', [
      'rnx-cli init MyApp',
      'rnx-cli i MyApp',
    ])
    printLineBreak()
  },
}
