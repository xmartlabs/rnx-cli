// export types
import { print } from 'gluegun'

export type Spinner = ReturnType<typeof print.spin>

export interface Command {
  message: string
  width: number
}

export interface Spinners {
  [key: string]: Spinner
}

export enum OperationKey {
  Install = 'Install',
  Configuration = 'Configuration',
  MinorDependencies = 'MinorDependencies',
  iOSDependencies = 'iOSDependencies',
  CreateBaseComponents = 'CreateBaseComponents',
  CreateProjectStructure = 'CreateProjectStructure',
  InstallReactNavigation = 'InstallReactNavigation',
  AddGitConfigFiles = 'AddGitConfigFiles',
  CloneRepoAndMoveProject = 'CloneRepoAndMoveProject',
}

export interface OperationMessages {
  message: string
  errorMessage: string
}

interface BaseOperations<T> {
  [OperationKey.Install]: T
  [OperationKey.Configuration]: T
  [OperationKey.MinorDependencies]: T
  [OperationKey.iOSDependencies]: T
  [OperationKey.CreateBaseComponents]: T
  [OperationKey.CreateProjectStructure]: T
  [OperationKey.InstallReactNavigation]: T
  [OperationKey.AddGitConfigFiles]: T
  [OperationKey.CloneRepoAndMoveProject]: T
}

export type Operations = BaseOperations<string>

export enum ResultType {
  Success = '✅',
  Fail = '❌',
}

export interface Result<T = string> {
  message?: string
  type: ResultType
  payload?: T
}

export enum YesOrNoChoice {
  Yes = 'Yes',
  No = 'No',
}
