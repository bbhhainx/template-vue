import i18n from "@/lang";
import type { App } from "vue";


/** danh sách các ngôn ngữ đã load được */
const LOADED_LANGUAGES = new Set<string>();

/** hàm load dữ liệu theo locale */
export async function loadLocale(locale: string) {
  
  // nếu ngôn ngữ đã được load thì không cần load lại
  if (LOADED_LANGUAGES.has(locale)) {
    i18n.global.locale.value = locale;
    return;
  }

  // nếu ngôn ngữ chưa được load thì load nó

  /** glob import của các file env */
  const MODULES = import.meta.glob('./*.ts')

  // load ngôn ngữ từ file tương ứng
  const MESSAGES:any = await MODULES[`./${locale}.ts`]();

  console.log("[i18n] Load language:", locale, MESSAGES.default);
  
  
  // lưu lại ngôn ngữ vào i18n
  i18n.global.setLocaleMessage(locale, MESSAGES.default);

  // lưu lại ngôn ngữ vào danh sách đã load
  LOADED_LANGUAGES.add(locale);

  // set ngôn ngữ hiện tại
  i18n.global.locale.value = locale;
}

/** hàm load i18n */
export async function loadI18n(APP:App<Element>) {
  // lấy ngôn ngữ hiện tại từ biến môi trường
  const locale = localStorage.getItem('locale') || "vi";

  // load ngôn ngữ
  await loadLocale(locale);

  // sử dụng i18n trong app
  APP.use(i18n);
}
