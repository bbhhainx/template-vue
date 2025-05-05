import type { DepartmentData, EmployeeData } from "@/interfaces"
import { defineStore } from "pinia"
import { ref } from "vue"

/** store chứa các thông tin cần thiết của app
 * @business_token: string - token dùng để call api
 * @loading: boolean - trạng thái loading của toàn app
 * @profile: EmployeeData - thông tin nhân viên đang đăng nhập
 * @employees: { [index: string]: EmployeeData } - danh sách nhân viên theo id rút gọn
 * @employee_ids: { [index: string]: EmployeeData } - danh sách nhân viên theo _id
 * @employees_array: EmployeeData[] - danh sách nhân viên dạng array
 * @departments: { [index: string]: DepartmentData } - danh sách phòng ban theo id rút gọn
 * @departments_ids: { [index: string]: DepartmentData } - danh sách phòng ban theo _id
 */
export const useAppStore = defineStore('app', () => {

  /** Token business */
  const business_token = ref<string>('')

  /** Loading */
  const loading = ref<boolean>(false)

  /** Profile */
  const profile = ref<EmployeeData>()

  /** Dữ liệu nhân viên theo id rút gọn */
  const employees = ref<{ [index: string]: EmployeeData }>({})

  /** Dữ liệu nhân viên theo _id */
  const employee_ids = ref<{ [index: string]: EmployeeData }>({})

  /** Danh sách nhân viên dạng array */
  const employees_array = ref<EmployeeData[]>([])

  /** Dữ liệu phòng ban theo id rút gọn */
  const departments = ref<{ [index: string]: DepartmentData }>({})

  /** Dữ liệu phòng ban theo _id */
  const departments_ids = ref<{ [index: string]: DepartmentData }>({})
  return {
    /** token dùng để call các api */
    business_token,
    /** trạng thái Loading của app */
    loading,
    /** dữ liệu của nhân sự đang đăng nhập */
    profile,
    /** Dữ liệu nhân viên theo id rút gọn */
    employees,
    /** Dữ liệu nhân viên theo _id */
    employee_ids,
    /** Danh sách nhân viên dạng array */
    employees_array,
    /** Dữ liệu phòng ban theo id rút gọn */
    departments,
    /** Dữ liệu phòng ban theo _id */
    departments_ids
  }
})