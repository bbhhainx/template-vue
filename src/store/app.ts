import type { DepartmentData, EmployeeData } from "@/interfaces"
import { defineStore } from "pinia"
import { ref } from "vue"

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
    /** Token business */
    business_token,
    /** Loading */
    loading,
    /** Profile */
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