import { build } from 'gluegun'

async function run(argv) {
  const cli = build()
    .brand('rnx-cli')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'rnx-cli-*', hidden: true })
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .defaultCommand(require('./commands/help'))
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
