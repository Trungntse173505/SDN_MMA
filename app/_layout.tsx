import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

// Cấu hình ban đầu cho Expo Router
export const unstable_settings = {
  // 1. 🔑 THAY ĐỔI: Đặt 'login' là route ban đầu
  initialRouteName: 'login',
};

export default function RootLayout() {
  // Lấy chế độ màu hiện tại của hệ thống (light/dark)
  const colorScheme = useColorScheme();

  return (
    // Áp dụng theme cho ứng dụng dựa trên chế độ màu của hệ thống
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        
        {/* 2. 🔑 THÊM MÀN HÌNH ĐĂNG NHẬP (Phải nằm trên cùng) */}
        <Stack.Screen name="login" options={{ headerShown: false }} /> 

        {/* 3. Nhóm Tabs (Chỉ truy cập được sau khi login) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 4. Các màn hình Chi tiết/Nghiệp vụ khác */}
        <Stack.Screen name="car/[id]" options={{ title: 'Chi tiết Xe' }} />
        <Stack.Screen name="compare/index" options={{ title: 'So sánh Xe' }} />
        <Stack.Screen name="customers/index" options={{ title: 'Hồ sơ Khách hàng' }} />
        <Stack.Screen name="customers/[id]" options={{ title: 'Chi tiết Khách hàng' }} />
        <Stack.Screen name="appointments/index" options={{ title: 'Quản lý Lịch hẹn' }} />
        <Stack.Screen name="feedback/index" options={{ title: 'Phản hồi & Khiếu nại' }} />
        <Stack.Screen name="feedback/[id]" options={{ title: 'Xử lý Khiếu nại' }} />
        <Stack.Screen name="allocations/index" options={{ title: 'Xe được phân bổ' }} />

        {/* 5. Màn hình Modal Chung */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Thông báo',
            headerShown: false, 
          }} 
        />
        
      </Stack>
      {/* Cài đặt màu cho thanh trạng thái (Status Bar) */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} /> 
    </ThemeProvider>
  );
}