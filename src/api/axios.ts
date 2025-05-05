import axios from "axios";

/** instance api tạo bằng axios */
const api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


/** các tham số truyền vào api */
interface ApiParam {
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Hàm gọi api với phương thức POST
 * @param url Đường dẫn api
 * @param body Tham số truyền vào
 * @param headers Header của api
 * @returns Kết quả trả về từ api
 */
export async function postApi<T>({
  url,
  body,
  headers,
}: ApiParam): Promise<T> {
  const res = await api.post(url, body, {
    headers: {
      ...api.defaults.headers.common,
      ...headers,
    },
  });

  return res.data;
}
