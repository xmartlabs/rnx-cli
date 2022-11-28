import { strings as Localize } from '../strings'
import { Operations as OperationType, OperationKey } from '../types'

export const config = {
  dependencies: ['react-native-svg', 'react-native-safe-area-context'],
  devDependencies: [
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-sort-keys-fix',
    'prettier',
    'react-native-svg-transformer',
    'babel-plugin-module-resolver',
  ],
  structureFolders: [
    '/src/assets/drawables/',
    '/src/assets/fonts/',
    '/src/common/',
    '/src/navigation/',
    '/src/scenes/',
    '/src/styles/',
  ],
  configurationFiles: [
    { template: 'prettierrc.js.ejs', target: '.prettierrc.js' },
    { template: 'eslintrc.js.ejs', target: '.eslintrc.js' },
    { template: 'eslintignore.ejs', target: '.eslintignore' },
    { template: 'prettierignore.ejs', target: '.prettierignore' },
    { template: 'assets.d.ts.ejs', target: 'src/types/assets.d.ts' },
    { template: 'svgrrc.ejs', target: '.svgrrc' },
    { template: 'tsconfig.json.ejs', target: 'tsconfig.json' },
    { template: 'babel.config.js.ejs', target: 'babel.config.js' },
    { template: 'metro.config.js.ejs', target: 'metro.config.js' },
  ],
}

export const reactNavigationConfig = {
  dependencies: [
    '@react-navigation/native-stack',
    '@react-navigation/native',
    'react-native-screens',
    'react-native-safe-area-context',
  ],
  configurationFiles: [
    { template: 'app.txt', target: 'src/App.tsx' },
    { template: 'index.txt', target: 'src/navigation/index.tsx' },
    { template: 'routes.txt', target: 'src/navigation/routes.ts' },
    { template: 'types.txt', target: 'src/navigation/types.ts' },
    { template: 'navigation.txt', target: 'src/common/navigation.ts' },
  ],
  structureFolders: [
    '/src/assets/drawables/',
    '/src/assets/fonts/',
    '/src/styles/',
  ],
}

export const operationsConfig: OperationType = {
  [OperationKey.Install]: Localize.Operations.Install,
  [OperationKey.AddGitConfigFiles]: Localize.Operations.AddGitConfigFiles,
  [OperationKey.CloneRepoAndMoveProject]:
    Localize.Operations.CloneRepoAndMoveProject,
  [OperationKey.CreateBaseComponents]: Localize.Operations.CreateBaseComponents,
  [OperationKey.CreateProjectStructure]:
    Localize.Operations.CreateProjectStructure,
  [OperationKey.Configuration]: Localize.Operations.Configuration,
  [OperationKey.InstallReactNavigation]: Localize.Operations.Configuration,
  [OperationKey.MinorDependencies]: Localize.Operations.MinorDependencies,
  [OperationKey.iOSDependencies]: Localize.Operations.iOSDependencies,
}
