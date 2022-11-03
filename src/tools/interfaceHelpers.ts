import { print } from 'gluegun'
import chalk from 'chalk'
import figlet from 'figlet'
import { Command, Spinner, Spinners } from '../types'

export const {
  gray,
  error,
  green,
  grey,
  red,
  bold,
  yellow,
  blue,
  white,
  underline,
  highlight,
} = print.colors

export const INDENT = '   '
export const DOUBLE_INDENT = `${INDENT}${INDENT}`

export const printInfo = (m = ''): void => print.info(gray(INDENT + m))
export const printLineBreak = () => printInfo()
export const heading = (m = ''): void => printInfo(white(bold(m)))

const xlBanner = [
  `${DOUBLE_INDENT}oooooooooooooooooooooooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}oooooooooooooooooooooooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}oooooooooooooooooooooooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}ooooooooo                                 oooooooo`,
  `${DOUBLE_INDENT}ooooooooo                                 oooooooo`,
  `${DOUBLE_INDENT}ooooooooo                                 oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooooooooooooo                 oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooooooooooo                   oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooooooooo                     oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooooooo                       oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooooo               o         oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooooo               ooo         oooooooo`,
  `${DOUBLE_INDENT}ooooooooooooo               ooooo         oooooooo`,
  `${DOUBLE_INDENT}ooooooooooo               ooooooo         oooooooo`,
  `${DOUBLE_INDENT}ooooooooo               ooooooooo         oooooooo`,
  `${DOUBLE_INDENT}ooooooo               ooooooooooo         oooooooo`,
  `${DOUBLE_INDENT}ooooo               oooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}ooo               oooooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}o               oooooooooooooooooooooooooooooooooo`,
  `${DOUBLE_INDENT}              oooooooooooooooooooooooooooooooooooo`,
]

export const CLIHeading = (): void => {
  print.fancy(
    chalk.cyan(
      figlet.textSync(`${INDENT}${INDENT}${INDENT}RNX`, {
        horizontalLayout: 'full',
      })
    )
  )
  print.fancy(chalk.cyan(xlBanner.join('\n')))
  printLineBreak()
}

export const printCommand = (
  command: string | Command = '',
  second = '',
  examples: string[] = []
): void => {
  command =
    typeof command === 'string'
      ? command
      : command.message + ' '.repeat(command.width - command.message.length)

  printInfo(white(command) + INDENT + gray(second))

  const indent = command.length + 2

  if (examples) {
    examples.forEach((ex) => printInfo(gray(' '.repeat(indent) + white(ex))))
  }
}

const spinners: Spinners = {}

export const startSpinner = (m = ''): Spinner => {
  let spinner = spinners[m]
  if (!spinner) {
    spinner = print.spin({ text: gray(m) })
    spinners[m] = spinner
  }
  return spinner
}

export const stopSpinner = (m: string, symbol: string): void => {
  const spinner = spinners[m]
  if (spinner) {
    spinner.stopAndPersist({ symbol })
    delete spinners[m]
  }
}

export const clearSpinners = (): void => {
  Object.keys(spinners).forEach((m) => {
    spinners[m].stop()
    delete spinners[m]
  })
}

export const spinner = {
  start: startSpinner,
  stop: stopSpinner,
  clear: clearSpinners,
}
