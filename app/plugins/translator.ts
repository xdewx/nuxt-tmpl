import { provideTranslator } from '@ipa-vue/core'

export default defineNuxtPlugin(() => {
  const { t } = useI18n()
  provideTranslator((key, defaultValue) => {
    const value = t(key)
    if (value !== key && value !== defaultValue)
      return value
    return defaultValue ?? key
  })
})
