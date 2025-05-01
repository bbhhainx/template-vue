import type { IEnv } from "@/interfaces";

/** hàm lấy môi trường hiện tại */
async function currentEnv(): Promise<{ $env: IEnv }> {
  // lấy current env
  const NODE_ENV = import.meta.env.VITE_APP_ENV || "development";

  /** glob import của các file env */
  const MODULES = import.meta.glob('./*.ts')

  // load file config theo env
  const r: any = await MODULES[`./${NODE_ENV}.ts`]()
  console.log(r);

  // dữ liệu lấy được từ file config
  const { ENV }: { ENV: IEnv } = r;

  return { $env: ENV };
}

/** làm load dữ liệu của môi trường hiện tại */
export async function loadEnv() {
  /** lấy dữ liệu của môi trường hiện tại */
  const r = await currentEnv();
  globalThis.$env = r.$env;

  console.log("[App] Load env:::", r.$env);
}