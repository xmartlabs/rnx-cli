import { print } from 'gluegun'
import chalk from 'chalk'
import figlet from 'figlet'

const { gray, white, bold } = print.colors

export const INDENT = '   '
export const DOUBLE_INDENT = `${INDENT}${INDENT}`

export const p = (m = ''): void => print.info(gray(INDENT + m))

export const heading = (m = ''): void => p(white(bold(m)))

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
  p()
}

export const command = (
  m: string | { m: string; width: number } = '',
  second = '',
  examples: string[] = []
): void => {
  m = typeof m === 'string' ? m : m.m + ' '.repeat(m.width - m.m.length)
  p(white(m) + INDENT + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(' '.repeat(indent) + white(ex))))
  }
}

type Spinner = ReturnType<typeof print.spin>
const spinners: { [key: string]: Spinner } = {}

export const startSpinner = (m = ''): Spinner => {
  let spinner = spinners[m]
  if (!spinner) {
    spinner = print.spin({ prefixText: INDENT, text: gray(m) })
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
} as const
