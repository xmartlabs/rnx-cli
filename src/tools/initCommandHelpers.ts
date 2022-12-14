import { GluegunTemplate } from 'gluegun/build/types/toolbox/template-types'

import * as execa from 'execa'
import { config, reactNavigationConfig } from './config'
import { OperationKey } from '../types'
import { handleOperation, installDependencies } from './util'
import { GluegunParameters } from 'gluegun'

export const generateConfigurationFiles = async (
  generate: GluegunTemplate['generate'],
  projectName: string
) =>
  await handleOperation(projectName, OperationKey.Configuration, async () => {
    for await (const configFile of config.configurationFiles) {
      generate({
        template: `configurationFiles/${configFile.template}`,
        target: `./${projectName}/${configFile.target}`,
      })
    }
  })

export const generateBaseComponents = async (
  generate: GluegunTemplate['generate'],
  projectName: string
) =>
  handleOperation(projectName, OperationKey.CreateBaseComponents, async () => {
    await Promise.all([
      generate({
        template: 'components/sceneContainer.styles.txt',
        target: `./${projectName}/src/components/sceneContainer/styles.ts`,
      }),
      generate({
        template: 'components/sceneContainer.txt',
        target: `./${projectName}/src/components/sceneContainer/index.tsx`,
      }),
    ])
  })

export const installBaseDependencies = async (projectName: string) =>
  await handleOperation(
    projectName,
    OperationKey.MinorDependencies,
    async () => {
      await installDependencies(
        projectName,
        true,
        config.devDependencies.join(' ')
      )

      await installDependencies(
        projectName,
        false,
        config.dependencies.join(' ')
      )
    }
  )

export const installReactNative = async (
  projectName: string,
  options?: GluegunParameters['options']
) =>
  await handleOperation(projectName, OperationKey.Install, async () => {
    const templateVersion = options['templateVersion']
      ? `@${options['version']}`
      : ''
    await execa.command(
      `npx react-native init ${projectName} --template react-native-template-typescript${templateVersion} --skip-install `
    )
  })

export const installIOSDependencies = async (projectName: string) =>
  await handleOperation(projectName, OperationKey.iOSDependencies, async () => {
    await execa.command(`npx pod-install ios`, {
      cwd: `${process.cwd()}/${projectName}/ios`,
    })
  })

export const generateBaseProjectStructure = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  reactNavigationInstalled: boolean
) =>
  await handleOperation(
    projectName,
    OperationKey.CreateProjectStructure,
    async () => {
      for await (const folder of reactNavigationInstalled
        ? reactNavigationConfig.structureFolders
        : config.structureFolders) {
        generate({
          template: 'components/keep',
          target: `${process.cwd()}/${projectName}${folder}${
            folder === '/src' ? '' : '.keep'
          }`,
        })
      }
    }
  )
