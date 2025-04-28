/// <reference types="vite/client" />

import type { IEnv } from "@/interfaces";

declare global {
  /**dữ liệu cấu hình của môi trường hiện tại */
  var $env: IEnv
}