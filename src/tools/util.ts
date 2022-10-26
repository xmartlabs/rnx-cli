import execa from 'execa'
import { Operations, Result, ResultType } from '../types'
import { startSpinner, stopSpinner } from './pretty'
import { print } from 'gluegun'

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

export const handleOperation = async <T = string>(
  operation: Operations,
  operationToHandle: () => Promise<Result<T>>
): Promise<Result<T>> => {
  startSpinner(operation)

  const result = await operationToHandle()

  stopSpinner(operation, result.type)

  if (result.type === ResultType.Fail) {
    print.error(result.message)
    process.exit(1)
  }

  return result
}
