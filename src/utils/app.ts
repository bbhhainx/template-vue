import type { IEnv } from "@/interfaces";

// #region load env

/**export các biến môi trường dựa theo node_env hiện tại */
async function currentEnv(): Promise<{ $env: IEnv }> {
  // lấy current env
  const NODE_ENV = import.meta.env.VITE_APP_ENV || "development";

  // load file config theo env
  const r = await import(`@/env/${NODE_ENV}.ts`);
  console.log(r);

  // dữ liệu lấy được từ file config
  const { ENV }: { ENV: IEnv } = r;

  return { $env: ENV };
}

export async function loadEnv() {
  /** lấy dữ liệu của môi trường hiện tại */
  const r = await currentEnv();
  globalThis.$env = r.$env;

  console.log("[App] Load env:::", r.$env);
}

// #endregion
