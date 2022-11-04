import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
  Github: {
    Ask: {
      Repo: 'Do you have a repository for the project?',
      Url: 'What its the repository url to clone it?',
    },
    DontForget: 'DONT FORGET TO SETUP YOUR GIT HOOKS RUNNING',
    Command: 'git config core.hooksPath .github/hooks',
    Repository: 'In your project repository folder',
  },
  Error: {
    logFile: `An error happens, for more info please check the log file {filePath:string}!`,
    operation: 'Error: {message: string}',
  },
  Navigation: {
    Ask: {
      Config: 'Do you want to add React Navigation base config?',
    },
    DontForget: `DON'T FORGET TO MODIFY THIS IN ANDROID!`,
    AddCode: 'Add the following code to the body of {activity: string} class:`',
    makeSure: `and make sure to add an import statement at the top of this file:`,
  },
  Operations: {
    Install: 'Creating project',
    Configuration: 'Creating configuration files',
    MinorDependencies: 'Installing dependencies, this may take a while...',
    iOSDependencies: 'Installing iOS dependencies',
    CreateBaseComponents: 'Creating base components',
    CreateProjectStructure: 'Creating project structure',
    InstallReactNavigation: 'Installing React Navigation',
    AddGitConfigFiles: 'Adding Github config files & pre-push hook',
    CloneRepoAndMoveProject: 'Cloning repo & moving RN project',
  },
}

export default en
