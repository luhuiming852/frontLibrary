import Vue from "vue";

declare global {
  interface Window {}

  interface ImportMetaEnv {
    /** 接口默认入口 */
    readonly VITE_DEFAULT_API: string;
    // 根路径
    readonly BASE_URL: string;
    // 环境类型
    readonly MODE: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob<T = unknown>(globPath: string): Record<string, T>;
    globEager<T = unknown>(globPath: string): Record<string, T>;
  }
}
