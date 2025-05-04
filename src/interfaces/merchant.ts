/** Thông tin phân quyền theo business */
export interface BusinessData {
  /** ID doanh nghiệp */
  business_id?: string;
  /** ID chi nhánh */
  branch_id?: string;
  /** ID phòng ban */
  department_id?: string;
  /** ID nhóm */
  team_id?: string;
  /** ID nhân viên */
  employee_id?: string;
}

/** Dữ liệu chi nhánh */
export interface BranchData {
  /** ID mongo */
  _id: string;
  /** ID chi nhánh rút gọn */
  id: string;
  /** Tên chi nhánh */
  name: string;
}

/** Dữ liệu phòng ban */
export interface DepartmentData {
  /** ID mongo */
  _id: string;
  /** ID phòng ban rút gọn */
  id: string;
  /** Tên phòng ban */
  name: string;
}

/** Thiết lập chấm công và làm việc của nhân viên */
export interface WorkingTimeSetting {
  /** Trạng thái làm việc */
  work_status: string;
  /** Tình trạng hoạt động */
  active: boolean;
  /** Thời gian checkin */
  checkin: {
    /** Giờ */
    hour: number;
    /** Phút */
    minute: number;
  };
  /** Thời gian checkout */
  checkout: {
    /** Giờ */
    hour: number;
    /** Phút */
    minute: number;
  };
  /** Tên lịch làm việc */
  title: string;
  /** Lý do nghỉ */
  reason?: {
    /** Lý do xin nghỉ */
    reason_message: string;
    /** Dạng xin nghỉ */
    reason_type: string;
  };
}

/** Dữ liệu nhân viên */
export interface EmployeeData extends BusinessData {
  /** ID nhân viên mongo */
  _id: string;
  /** ID nhân viên rút gọn */
  id: string;
  /** Tên họ */
  first_name: string;
  /** Tên chính thức */
  last_name: string;
  /** Email */
  email: string;
  /** Id quản lý */
  manager_id?: string;
  /** Avatar */
  avatar: string;
  /** ID facebook của nhân viên */
  fb_staff_id: string;
  /** Số điện thoại công ty */
  company_phone_number: string;
  /** ID tài khoản telegram */
  telegram_id: string;
  /** Trạng thái hoạt động */
  working: boolean;
  /** Thông tin cá nhân */
  personal_information: {
    /** Số điện thoại */
    phone_number: string;
    /** Ngày sinh */
    birth_day: string;
    /** Số chứng minh nhân dân */
    cccd: string;
    /** Ngày cấp chứng minh nhân dân */
    cccd_release_date: string;
    /** Địa chỉ thường trú */
    permanent_address: string;
    /** Địa chỉ hiện tại */
    current_address: string;
  };
  /** Thông tin tại công ty */
  work_information: {
    /** Ngày thử việc */
    probationary_day: string;
    /** Ngày chính thức */
    official_working_day: string;
    /** Ngày nghỉ việc */
    day_off: string;
    /** Số tài khoản ngân hàng */
    bank_account_number: string;
    /** Tên ngân hàng */
    bank_name: string;
    /** Số bảo hiểm xã hội */
    social_insurance_book: string;
    /** Số hợp đồng */
    contract_number: string;
    /** Loại hợp đồng */
    contract_type: string;
    /** Thời hạn hợp đồng */
    contract_duration: string;
    /** Link hợp đồng */
    contract_link: string;
    /** Dạng làm việc partime or fulltime */
    type_of_shift: string;
  };
  /** Thiết lập chấm công của nhân viên */
  working_time_setting: WorkingTimeSetting[];

  /** Trạng thái nhân viên đang được chọn hay không */
  selected?: boolean;

  /** thông tin chi nhánh */
  branch?: BranchData;

  /** id nhân viên */
  user_id?: string;

  /** id chatbox */
  chatbox_user_id?: string;
}

/** Dữ liệu thiết lập chi nhánh */
export interface BranchSetting {
  /** Dữ liệu thiết lập */
  setting_data: { [index: string]: number };
  /** Dạng thiết lập */
  setting_type: string;
}
