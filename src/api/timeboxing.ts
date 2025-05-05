import { postApi } from "@/api/axios";

/** hàm gọi tới các api liên quan đến app Timeboxing
 * @param endpoint: đường dẫn api
 * @param body: tham số truyền vào
 * @param headers: header của api
 * @returns Kết quả trả về từ api
 */
async function apiTimeboxing({
  endpoint,
  body,
  headers,
}: {
  endpoint: string;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}) {
  try {
    const res = await postApi({
      url: `${$env.test}/${endpoint}`,
      body,
      headers,
    });
    return res;
  } catch (e) {
    console.error("Error in apiTimeboxing:", e);
    throw e;
  }
}

/** hàm lấy danh sách task */
export async function getListTask() {
  return await apiTimeboxing({
    endpoint: "task/getListTask",
  });
}
