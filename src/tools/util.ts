import execa from 'execa'
import { Operations, Result, ResultType } from '../types'
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
  operation: Operations,
  operationToHandle: () => Promise<void>
): Promise<void> => {
  try {
    startSpinner(operation)

    await operationToHandle()

    stopSpinner(operation, ResultType.Success)
  } catch (error) {
    stopSpinner(operation, ResultType.Fail)
    revertOperation(projectName)
    logError(error)
    process.exit(1)
  }
}

export const revertOperation = (projectName: string) => {
  execa.command(`rm -rf ${projectName}`)
}
