import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import HOME_VI from 'src/locales/vi/home.json'
import PROFILE_VI from 'src/locales/vi/profile.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    product: PRODUCT_EN,
    profile: PROFILE_EN,
    home: HOME_EN
  },
  vi: {
    product: PRODUCT_VI,
    profile: PROFILE_VI,
    home: HOME_VI
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'profile', 'product'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
