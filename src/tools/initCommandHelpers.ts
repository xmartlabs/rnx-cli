import { GluegunTemplate } from 'gluegun/build/types/toolbox/template-types'

import * as execa from 'execa'
import { config, reactNavigationConfig } from './config'
import { Operations, Result, ResultType } from '../types'
import { handleOperation, installDependencies } from './util'

export const generateConfigurationFiles = async (
  generate: GluegunTemplate['generate'],
  projectName: string
): Promise<Result> =>
  await handleOperation(Operations.Configuration, async () => {
    try {
      for await (const configFile of config.configurationFiles) {
        generate({
          template: `./configurationFiles/${configFile.template}`,
          target: `./${projectName}/${configFile.target}`,
        })
      }

      return { type: ResultType.Success }
    } catch (error) {
      return {
        type: ResultType.Fail,
        message: 'Error generating configuration files',
      }
    }
  })

export const generateBaseComponents = async (
  generate: GluegunTemplate['generate'],
  projectName: string
): Promise<Result> =>
  handleOperation(Operations.CreateBaseComponents, async () => {
    try {
      await Promise.all([
        generate({
          template: './components/sceneContainer.styles.txt',
          target: `./${projectName}/src/components/sceneContainer/styles.ts`,
        }),
        generate({
          template: './components/sceneContainer.txt',
          target: `./${projectName}/src/components/sceneContainer/index.tsx`,
        }),
      ])
      return { type: ResultType.Success }
    } catch (error) {
      return {
        type: ResultType.Fail,
        message: 'Error generating base components',
      }
    }
  })

export const installBaseDependencies = async (
  projectName: string
): Promise<Result> =>
  handleOperation(Operations.MinorDependencies, async () => {
    try {
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

      return { type: ResultType.Success }
    } catch (error) {
      return {
        type: ResultType.Fail,
        message: 'You need Node installed to run this CLI',
      }
    }
  })

export const installReactNative = async (
  projectName: string
): Promise<Result> =>
  handleOperation(Operations.Install, async () => {
    try {
      await execa.command(
        `npx react-native init ${projectName} --template react-native-template-typescript --skip-install`
      )
      return { type: ResultType.Success }
    } catch (error) {
      return {
        type: ResultType.Fail,
        message: 'You need Node installed to run this CLI',
      }
    }
  })

export const installIOSDependencies = async (
  projectName: string
): Promise<Result> =>
  handleOperation(Operations.iOSDependencies, async () => {
    try {
      await execa.command(`npx pod-install ios`, {
        cwd: `${process.cwd()}/${projectName}/ios`,
      })

      return { type: ResultType.Success }
    } catch (error) {
      return {
        type: ResultType.Fail,
        message:
          'You need few things to install iOS dependencies.\n • Check if you have CocoaPods installed, run `pod --version`\n • Check if you ruby version is the one that is marked in the _ruby_version file',
      }
    }
  })

export const generateBaseProjectStructure = async (
  generate: GluegunTemplate['generate'],
  projectName: string,
  reactNavigationInstalled: boolean
): Promise<Result> =>
  handleOperation(Operations.CreateProjectStructure, async () => {
    try {
      for await (const folder of reactNavigationInstalled
        ? reactNavigationConfig.structureFolders
        : config.structureFolders) {
        generate({
          template: './components/keep',
          target: `${process.cwd()}/${projectName}${folder}${
            folder === '/src' ? '' : '.keep'
          }`,
        })
      }
      return { type: ResultType.Success }
    } catch (error) {
      return { type: ResultType.Fail }
    }
  })
