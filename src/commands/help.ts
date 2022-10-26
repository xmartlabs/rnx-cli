import { GluegunToolbox } from 'gluegun'
import { p, command, heading, CLIHeading } from '../tools/pretty'

module.exports = {
  dashed: true,
  alias: ['h'],
  description: 'Displays XL React Native CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox

    CLIHeading()

    p()
    heading(`Welcome to XL React Native CLI ${meta.version()}!`)
    p()
    p('XL React Native CLI is a CLI that helps you spin up')
    p('a new React Native project with all the minimal configuration')
    p('needed and it without losing any time!')
    p()
    heading('Commands')
    p()
    command('init            ', 'Creates a new React Native app', [
      'rnx-cli init MyApp',
      'rnx-cli i MyApp',
    ])
    p()
  },
}
