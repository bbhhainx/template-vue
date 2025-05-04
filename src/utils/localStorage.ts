interface ILocalStorage {
  /** Lưu dữ liệu vào localStorage */
  set(key: string, value: string): void
  /** Lấy dữ liệu từ localStorage */
  get(key: string): string | null
  /** Xóa dữ liệu trong localStorage */
  remove(key: string): void
}

/** đối tượng để thao tác với localstorage */
export const LOCAL_STORAGE:ILocalStorage = {
  set(key: string, value: string) {
    localStorage.setItem(key, value)
  },
  get(key: string) {
    return localStorage.getItem(key)
  },
  remove(key: string) {
    localStorage.removeItem(key)
  }
}