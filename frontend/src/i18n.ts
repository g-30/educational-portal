// i18n.js

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './translations/en.json'
import ruTranslation from './translations/ru.json'
import kkTranslation from './translations/kz.json'

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslation,
        },
        ru: {
            translation: ruTranslation,
        },
        kk: {
            translation: kkTranslation,
        },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
        escapeValue: false, // React already escapes variables
    },
})

export default i18n
