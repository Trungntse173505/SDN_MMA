import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '../../constants/ApiConfig';

/**
 * Hàm tiện ích thực hiện yêu cầu GET bảo mật (có đính kèm JWT Token).
 * @param endpoint - Phần cuối của URL (ví dụ: '/product').
 * @param params - Các tham số query (ví dụ: { page: 1, limit: 20 }).
 * @returns Dữ liệu JSON từ phần 'data' của API response.
 */
export const fetchSecureGet = async (endpoint: string, params: Record<string, any> = {}) => {
    // 1. Đọc Token từ AsyncStorage
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
        // Nếu không có token, ném lỗi để xử lý điều hướng về Login
        throw new Error("UNAUTHORIZED"); 
    }
    
    // 2. Xây dựng URL với tham số query
    const urlParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${endpoint}?${urlParams}`; 

    // 3. Gọi API với Header Authorization
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // ⬅️ ĐÍNH KÈM TOKEN
        },
    });

    // 4. Xử lý lỗi Token hết hạn
    if (response.status === 401 || response.status === 403) {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        throw new Error("TOKEN_EXPIRED");
    }

    const data = await response.json();
    
    if (!data.success) {
         throw new Error(data.message || "Lỗi khi lấy dữ liệu từ server.");
    }
    
    // Trả về phần 'data' (products và pagination)
    return data.data; 
};