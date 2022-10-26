// export types

export enum Operations {
  Install = 'Creating project',
  Configuration = 'Creating configuration files',
  MinorDependencies = 'Installing dependencies, this may take a while...',
  iOSDependencies = 'Installing iOS dependencies',
  CreateBaseComponents = 'Creating base components',
  CreateProjectStructure = 'Creating project structure',
  InstallReactNavigation = 'Installing React Navigation',
  AddGitConfigFiles = 'Adding Github config files & pre-push hook',
}

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
