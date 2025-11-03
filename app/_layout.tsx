import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native'; 

// Cấu hình ban đầu cho Expo Router
export const unstable_settings = {
  // Đặt (tabs) là route ban đầu
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  // Lấy chế độ màu hiện tại của hệ thống (light/dark)
  const colorScheme = useColorScheme();

  return (
    // Áp dụng theme cho ứng dụng dựa trên chế độ màu của hệ thống
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        
        {/* 1. Nhóm Tabs (Trang Chủ, Tìm kiếm, Tài khoản) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 2. Màn hình Chi tiết Xe */}
        <Stack.Screen name="car/[slug]" options={{ title: 'Chi tiết Xe' }} />
        
        {/* 3. Màn hình So sánh Xe */}
        <Stack.Screen name="compare/index" options={{ title: 'So sánh Xe' }} />

        {/* 4. Màn hình Quản lý Khách hàng */}
        <Stack.Screen name="customers/index" options={{ title: 'Hồ sơ Khách hàng' }} />
        
        {/* 5. Màn hình Chi tiết Khách hàng (Dynamic Route) */}
        <Stack.Screen name="customers/[id]" options={{ title: 'Chi tiết Khách hàng' }} />

        {/* 6. Màn hình Quản lý Lịch hẹn */}
        <Stack.Screen name="appointments/index" options={{ title: 'Quản lý Lịch hẹn' }} />
        
        {/* 7. Màn hình Quản lý Phản hồi/Khiếu nại */}
        <Stack.Screen name="feedback/index" options={{ title: 'Phản hồi & Khiếu nại' }} />

        {/* 8. Màn hình Chi tiết Xử lý Khiếu nại (Dynamic Route) */}
        <Stack.Screen name="feedback/[id]" options={{ title: 'Xử lý Khiếu nại' }} />

        {/* 9. Màn hình Modal Chung (Hiển thị form, thông báo...) */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Thông báo',
            headerShown: false, // Thường ẩn header trong modal
          }} 
        />
        
      </Stack>
      {/* Cài đặt màu cho thanh trạng thái (Status Bar) */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} /> 
    </ThemeProvider>
  );
}