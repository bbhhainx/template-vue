import type { MessageSchema } from "@/interfaces";
export default {
  common: {
    hello: "Hello",
  },
  // nếu thiếu key nào ở đây → TypeScript sẽ báo lỗi
} satisfies MessageSchema;