import i18n from 'i18next'
import en from './locales/en.json'
import nl from './locales/nl.json'

i18n.addResourceBundle('en', 'canvas', en, true, true)
i18n.addResourceBundle('nl', 'canvas', nl, true, true)

export default i18n
