// constants/ApiConfig.ts

// 1. BASE URL CỦA API
// ✅ Đây là đường dẫn gốc
// export const API_BASE_URL = 'http://192.168.1.207:3000/api/client'; 
export const API_BASE_URL = "http://192.168.2.102:3000/api/client";

// 2. KEY LƯU TRỮ TOKEN
// ✅ Dùng làm khóa để lưu và lấy mã token xác thực (JWT) từ AsyncStorage
export const AUTH_TOKEN_KEY = "@EVDMS:AuthToken";

// 3. KEY LƯU TRỮ THÔNG TIN USER (Tùy chọn)
export const USER_INFO_KEY = "@EVDMS:User";
