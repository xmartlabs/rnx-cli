import pino from 'pino'
import { tmpdir } from 'os'
import { join } from 'path'
import { printInfo, printLineBreak } from './interfaceHelpers'
import { strings as Localize } from '../strings'

const destinationFilePath = join(tmpdir(), `rnx-cli-error-${process.pid}`)

const transport = pino.transport({
  targets: [
    {
      level: 'error',
      target: 'pino-pretty',
      options: {
        destination: destinationFilePath,
      },
    },
  ],
})

const logger = pino(transport)

export const logError = (error: Error) => {
  printLineBreak()
  logger.error(error)
  printLineBreak()
  printInfo(Localize.Error.logFile(destinationFilePath))
}

export const logInfo = (info: never) => {
  logger.info(info)
}
