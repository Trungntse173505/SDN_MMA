import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "../constants/ApiConfig";

// Định nghĩa kiểu dữ liệu cho response thành công
interface LoginResponseData {
  token: string;
  user: {
    id: string;
    fullName: string;
    role: string;
  };
}

// Định nghĩa kiểu cho kết quả trả về của hook
interface AuthHookResult {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: LoginResponseData; message: string }>;
  loading: boolean;
}

export const useAuth = (): AuthHookResult => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.success && json.data?.token) {
        // Lưu Token vào AsyncStorage
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, json.data.token);
        await AsyncStorage.setItem("user", json.data.fullName);

        return {
          success: true,
          data: json.data as LoginResponseData,
          message: json.message,
        };
      } else {
        // Trả về message lỗi từ server
        return {
          success: false,
          message: json.message || "Tên đăng nhập hoặc mật khẩu không đúng.",
        };
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      return { success: false, message: "Không thể kết nối tới máy chủ API." };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
