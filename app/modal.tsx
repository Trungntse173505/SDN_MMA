import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors'; // Import Colors

export default function GlobalModalScreen() {
  // Component này đóng vai trò là Modal chung cho ứng dụng.
  // Bạn có thể sử dụng nó để chứa các form nhỏ (ví dụ: Tạo Báo giá nhanh, Thêm Lịch hẹn)
  // hoặc thông báo.

  return (
    <View style={styles.container}>
      {/* Ẩn Header của Modal nếu bạn muốn dùng một giao diện tùy chỉnh. */}
      {/* Nếu bạn dùng useNavigation để đóng modal, không cần component này. 
          Nhưng chúng ta sẽ giữ lại một nút đóng thủ công. */}
      <Stack.Screen options={{ 
        title: 'Form Nhanh', 
        headerShown: true, // Hiển thị Header để có nút đóng mặc định (trên iOS)
        presentation: 'modal' 
      }} />

      <View style={styles.content}>
        <Text style={styles.title}>Mẫu Form Nhanh / Thông báo</Text>
        <Text style={styles.subtitle}>Sử dụng component này cho các tác vụ cần sự tập trung, ví dụ:</Text>
        
        <View style={styles.list}>
          <Text style={styles.listItem}>• Form Tạo Lịch hẹn</Text>
          <Text style={styles.listItem}>• Form Ghi nhận Phản hồi</Text>
          <Text style={styles.listItem}>• Danh sách xe chọn để so sánh</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <AntDesign size={20} color="white" />
          <Text style={styles.buttonText}>Đồng ý / Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 3,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});