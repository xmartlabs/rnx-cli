import execa from 'execa'
import { OperationKey, Result, ResultType } from '../types'
import { operationsConfig } from './config'
import { startSpinner, stopSpinner } from './interfaceHelpers'
import { logError } from './logging'

export const installDependencies = async (
  projectName: string,
  isDevDependencies: boolean,
  dependencies: string
): Promise<Result> => {
  try {
    await execa.command(
      `npm i ${dependencies} ${
        isDevDependencies ? '--save-dev' : ''
      } --no-package-lock`,
      {
        cwd: `${process.cwd()}/${projectName}`,
      }
    )
    return { type: ResultType.Success }
  } catch (error) {
    return {
      type: ResultType.Fail,
      message: 'You need Node installed to run this CLI',
    }
  }
}

export const handleOperation = async (
  projectName: string,
  operation: OperationKey,
  operationToHandle: () => Promise<void>
): Promise<void> => {
  const message = operationsConfig[operation]

  try {
    startSpinner(message)

    await operationToHandle()

    stopSpinner(message, ResultType.Success)
  } catch (error) {
    stopSpinner(message, ResultType.Fail)
    revertOperation(projectName)
    logError(error)
    process.exit(1)
  }
}

export const revertOperation = (projectName: string) => {
  execa.command(`rm -rf ${projectName}`)
}
