import L from './i18n-node'
import { TranslationFunctions } from './i18n-types'
import { detectLocale } from './i18n-util'

const TranslationService = (): TranslationFunctions => {
  const locale = detectLocale()

  switch (locale) {
    case 'en':
      return L.en
    default:
      return L.en
  }
}

export const Localize = TranslationService()
