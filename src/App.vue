<template>
  <div v-if="business_token">
    <RouterView />
  </div>
  <div
    v-if="hidden_app"
    class="w-screen h-dvh flex items-center justify-center"
  >
    <p>Đang cập nhật ứng dụng... Vui lòng chờ</p>
  </div>
</template>
<script setup lang="ts">
import $app from "@/utils/app";
import { useAppStore } from "@/store";
import { LOCAL_STORAGE } from "@/utils/localStorage";

// * libraries
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// * types
import type { DepartmentData, EmployeeData } from "@/interfaces";

/** app store */
const {
  business_token,
  employees,
  employees_array,
  employee_ids,
  profile,
  departments,
  departments_ids,
} = storeToRefs(useAppStore());

/** ẩn app */
const hidden_app = ref(false);

onMounted(async () => {
  setTimeout(() => {
    // Nếu sau 3s không nhận được token từ merchant thì báo lỗi
    if (!business_token.value) {
      hidden_app.value = true;
    }

    // nếu app hoạt động bình thường thì không cần refresh => lưu là 0
    if (!hidden_app.value) {
      LOCAL_STORAGE.set("refresh", "0");
      return;
    }

    /** trạng thái refresh app lưu trong local storage */
    const REFRESH = LOCAL_STORAGE.get("refresh");

    console.log("refresh", REFRESH);

    // nếu app đã load lại 1 lần thì thôi dừng lại
    if (REFRESH !== "0" && REFRESH !== "undefined" && REFRESH) return;

    // * refresh
    $app.sendEvent({
      type: "app.refresh",
    });

    // Lưu trạng thái đã refresh app vào local storage
    LOCAL_STORAGE.set("refresh", "1");
  }, 3000);
});

// * Sau khi Frame Loaded thì gửi các event khác
const handleFrameLoaded = () => {
  // * Gửi event app.ready để Frame (Parent) biết là App đã sẵn sàng
  $app.sendEvent({
    type: "app.ready",
  });

  // * Gửi các event khác để lấy dữ liệu employee
  $app.sendEvent({
    type: "get.employee",
  });

  // * Gửi các event khác để lấy dữ liệu department
  $app.sendEvent({
    type: "get.department",
  });

  // * Gửi các event khác để lấy dữ token_business
  $app.sendEvent({
    type: "get.token_business",
  });

  // * Lấy profile nhân viên hiện tại
  $app.sendEvent({
    type: "get.profile",
  });
};

/** Xử lý nhận message từ Frame (Parent) */
const handlePostMessages = (event: any) => {
  switch (event.type) {
    // * Sau khi Frame được Loaded thì xử lý các actions
    case "frame.loaded":
      handleFrameLoaded();
      break;

    // * Xử lý router nhận từ iframe cha
    case "route":
      handleRoute(event.data);
      break;

    // * Nhận và lưu thông tin nhân viên vào store
    case "get.employee":
      /** Danh sách nhân viên theo id rút gọn */
      const EMPLOYEES: { [index: string]: EmployeeData } = {};

      /** Danh sách nhân viên theo id mongo */
      const EMPLOYEE_IDS: { [index: string]: EmployeeData } = {};

      // * Xử lý lần lượt từng nhân viên
      event.data.map((item: EmployeeData) => {
        EMPLOYEES[item.id] = item;
        EMPLOYEE_IDS[item._id] = item;
      });

      // * Lưu dữ liệu dạng array vào store
      employees_array.value = event.data

      // * Lưu dữ liệu dạng object vào store (id rút gọn)
      employees.value = EMPLOYEES;

      // * Lưu dữ liệu dạng object vào store (id mongo)
      employee_ids.value = EMPLOYEE_IDS;
      break;

    // * Nhận và lưu thông tin phòng ban vào store
    case "get.department":
      /** Danh sách phòng ban */
      const DEPARTMENTS: { [index: string]: DepartmentData } = {};

      /** Danh sách phòng ban theo id rút gọn */
      const DEPARTMENT_IDS: { [index: string]: DepartmentData } = {};

      // * Xử lý lần lượt từng phòng ban
      event.data.map((item: DepartmentData) => {
        DEPARTMENTS[item.id] = item;
        DEPARTMENT_IDS[item._id] = item;
      });

      // * Lưu dữ liệu dạng object vào store (id rút gọn)
      departments.value = DEPARTMENTS;
      // * Lưu dữ liệu dạng object vào store (id mongo)
      departments_ids.value = DEPARTMENT_IDS;
      break;

    // * Nhận và lưu token business vào store
    case "get.token_business":
      // * Lưu token business vào store
      business_token.value = event.data;
      break;

    // * Nhận và lưu thông tin profile của user hiện tại vào store
    case "get.profile":
      // * Lưu thông tin profile vào store
      profile.value = event.data;
      break;
  }
};

/** Xử lý router */
const handleRoute = (data: {
  query: {
    feature: string
    id: string
    page: string
  }
  is_back: boolean
}) => {
  // * Xử lý khi có sự kiện drag to back
  if (data.is_back) {
  }

  // * Nếu có query thì chuyển hướng đến trang tương ứng
  if (data.query) {
    const { feature, id, page } = data.query;

  }

  
}

// * Lắng nghe event từ Frame (Parent)
$app.onEvent((event: any) => {
  handlePostMessages(event);
});
</script>
