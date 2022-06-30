import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import zhcn from "@/locales/zh-cn.json";

const i18n = createI18n({
  locale: "zh-cn",
  legacy: false,
  globalInjection: true,
  silentFallbackWarn: true,
  // 语言包文件内容
  messages: {
    "zh-cn": zhcn,
    en: en,
  },
});

export default i18n;
