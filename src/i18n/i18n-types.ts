// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	Github: {
		Ask: {
			/**
			 * D​o​ ​y​o​u​ ​h​a​v​e​ ​a​ ​r​e​p​o​s​i​t​o​r​y​ ​f​o​r​ ​t​h​e​ ​p​r​o​j​e​c​t​?
			 */
			Repo: string
			/**
			 * W​h​a​t​ ​i​t​s​ ​t​h​e​ ​r​e​p​o​s​i​t​o​r​y​ ​u​r​l​ ​t​o​ ​c​l​o​n​e​ ​i​t​?
			 */
			Url: string
		}
		/**
		 * D​O​N​T​ ​F​O​R​G​E​T​ ​T​O​ ​S​E​T​U​P​ ​Y​O​U​R​ ​G​I​T​ ​H​O​O​K​S​ ​R​U​N​N​I​N​G
		 */
		DontForget: string
		/**
		 * g​i​t​ ​c​o​n​f​i​g​ ​c​o​r​e​.​h​o​o​k​s​P​a​t​h​ ​.​g​i​t​h​u​b​/​h​o​o​k​s
		 */
		Command: string
		/**
		 * I​n​ ​y​o​u​r​ ​p​r​o​j​e​c​t​ ​r​e​p​o​s​i​t​o​r​y​ ​f​o​l​d​e​r
		 */
		Repository: string
	}
	Error: {
		/**
		 * A​n​ ​e​r​r​o​r​ ​h​a​p​p​e​n​s​,​ ​f​o​r​ ​m​o​r​e​ ​i​n​f​o​ ​p​l​e​a​s​e​ ​c​h​e​c​k​ ​t​h​e​ ​l​o​g​ ​f​i​l​e​ ​{​f​i​l​e​P​a​t​h​}​!
		 * @param {string} filePath
		 */
		logFile: RequiredParams<'filePath'>
		/**
		 * E​r​r​o​r​:​ ​{​m​e​s​s​a​g​e​}
		 * @param {string} message
		 */
		operation: RequiredParams<'message'>
	}
	Navigation: {
		Ask: {
			/**
			 * D​o​ ​y​o​u​ ​w​a​n​t​ ​t​o​ ​a​d​d​ ​R​e​a​c​t​ ​N​a​v​i​g​a​t​i​o​n​ ​b​a​s​e​ ​c​o​n​f​i​g​?
			 */
			Config: string
		}
		/**
		 * D​O​N​'​T​ ​F​O​R​G​E​T​ ​T​O​ ​M​O​D​I​F​Y​ ​T​H​I​S​ ​I​N​ ​A​N​D​R​O​I​D​!
		 */
		DontForget: string
		/**
		 * A​d​d​ ​t​h​e​ ​f​o​l​l​o​w​i​n​g​ ​c​o​d​e​ ​t​o​ ​t​h​e​ ​b​o​d​y​ ​o​f​ ​{​a​c​t​i​v​i​t​y​}​ ​c​l​a​s​s​:​`
		 * @param {string} activity
		 */
		AddCode: RequiredParams<'activity'>
		/**
		 * a​n​d​ ​m​a​k​e​ ​s​u​r​e​ ​t​o​ ​a​d​d​ ​a​n​ ​i​m​p​o​r​t​ ​s​t​a​t​e​m​e​n​t​ ​a​t​ ​t​h​e​ ​t​o​p​ ​o​f​ ​t​h​i​s​ ​f​i​l​e​:
		 */
		makeSure: string
	}
	Operations: {
		/**
		 * C​r​e​a​t​i​n​g​ ​p​r​o​j​e​c​t
		 */
		Install: string
		/**
		 * C​r​e​a​t​i​n​g​ ​c​o​n​f​i​g​u​r​a​t​i​o​n​ ​f​i​l​e​s
		 */
		Configuration: string
		/**
		 * I​n​s​t​a​l​l​i​n​g​ ​d​e​p​e​n​d​e​n​c​i​e​s​,​ ​t​h​i​s​ ​m​a​y​ ​t​a​k​e​ ​a​ ​w​h​i​l​e​.​.​.
		 */
		MinorDependencies: string
		/**
		 * I​n​s​t​a​l​l​i​n​g​ ​i​O​S​ ​d​e​p​e​n​d​e​n​c​i​e​s
		 */
		iOSDependencies: string
		/**
		 * C​r​e​a​t​i​n​g​ ​b​a​s​e​ ​c​o​m​p​o​n​e​n​t​s
		 */
		CreateBaseComponents: string
		/**
		 * C​r​e​a​t​i​n​g​ ​p​r​o​j​e​c​t​ ​s​t​r​u​c​t​u​r​e
		 */
		CreateProjectStructure: string
		/**
		 * I​n​s​t​a​l​l​i​n​g​ ​R​e​a​c​t​ ​N​a​v​i​g​a​t​i​o​n
		 */
		InstallReactNavigation: string
		/**
		 * A​d​d​i​n​g​ ​G​i​t​h​u​b​ ​c​o​n​f​i​g​ ​f​i​l​e​s​ ​&​ ​p​r​e​-​p​u​s​h​ ​h​o​o​k
		 */
		AddGitConfigFiles: string
		/**
		 * C​l​o​n​i​n​g​ ​r​e​p​o​ ​&​ ​m​o​v​i​n​g​ ​R​N​ ​p​r​o​j​e​c​t
		 */
		CloneRepoAndMoveProject: string
	}
}

export type TranslationFunctions = {
	Github: {
		Ask: {
			/**
			 * Do you have a repository for the project?
			 */
			Repo: () => LocalizedString
			/**
			 * What its the repository url to clone it?
			 */
			Url: () => LocalizedString
		}
		/**
		 * DONT FORGET TO SETUP YOUR GIT HOOKS RUNNING
		 */
		DontForget: () => LocalizedString
		/**
		 * git config core.hooksPath .github/hooks
		 */
		Command: () => LocalizedString
		/**
		 * In your project repository folder
		 */
		Repository: () => LocalizedString
	}
	Error: {
		/**
		 * An error happens, for more info please check the log file {filePath}!
		 */
		logFile: (arg: { filePath: string }) => LocalizedString
		/**
		 * Error: {message}
		 */
		operation: (arg: { message: string }) => LocalizedString
	}
	Navigation: {
		Ask: {
			/**
			 * Do you want to add React Navigation base config?
			 */
			Config: () => LocalizedString
		}
		/**
		 * DON'T FORGET TO MODIFY THIS IN ANDROID!
		 */
		DontForget: () => LocalizedString
		/**
		 * Add the following code to the body of {activity} class:`
		 */
		AddCode: (arg: { activity: string }) => LocalizedString
		/**
		 * and make sure to add an import statement at the top of this file:
		 */
		makeSure: () => LocalizedString
	}
	Operations: {
		/**
		 * Creating project
		 */
		Install: () => LocalizedString
		/**
		 * Creating configuration files
		 */
		Configuration: () => LocalizedString
		/**
		 * Installing dependencies, this may take a while...
		 */
		MinorDependencies: () => LocalizedString
		/**
		 * Installing iOS dependencies
		 */
		iOSDependencies: () => LocalizedString
		/**
		 * Creating base components
		 */
		CreateBaseComponents: () => LocalizedString
		/**
		 * Creating project structure
		 */
		CreateProjectStructure: () => LocalizedString
		/**
		 * Installing React Navigation
		 */
		InstallReactNavigation: () => LocalizedString
		/**
		 * Adding Github config files & pre-push hook
		 */
		AddGitConfigFiles: () => LocalizedString
		/**
		 * Cloning repo & moving RN project
		 */
		CloneRepoAndMoveProject: () => LocalizedString
	}
}

export type Formatters = {}
