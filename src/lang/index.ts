import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "vi", // default
  fallbackLocale: "en",
  messages: {}, // để trống, sẽ load sau
  globalInjection: true,
});

export default i18n;