import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function TabProfile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <AntDesign name="user" size={60} color="#333" />
          <Text style={styles.name}>Nguyễn Văn A</Text>
          <Text style={styles.role}>Dealer Staff - Chi nhánh Quận 1</Text>
        </View>

        <Text style={styles.sectionTitle}>Quản lý Nghiệp vụ</Text>

        {/* ✅ HỒ SƠ KHÁCH HÀNG */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/customers/index')}
        >
          <Feather name="users" size={20} color="green" />
          <Text style={styles.menuText}>Hồ sơ Khách hàng</Text>
        </TouchableOpacity>

        {/* ✅ LỊCH HẸN LÁI THỬ */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/appointments')}
        >
          <Feather name="calendar" size={20} color="blue" />
          <Text style={styles.menuText}>Quản lý Lịch hẹn Lái thử</Text>
        </TouchableOpacity>

        {/* ✅ PHẢN HỒI & KHIẾU NẠI */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/feedback/index')}
        >
          <AntDesign size={20} color="orange" />
          <Text style={styles.menuText}>Phản hồi & Khiếu nại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="file-text" size={20} color="#555" />
          <Text style={styles.menuText}>Quản lý Báo giá & Hợp đồng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <AntDesign  size={20} color="red" />
          <Text style={styles.menuText}>Báo cáo Doanh số</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Cài đặt & Hỗ trợ</Text>

        <TouchableOpacity style={styles.menuItem}>
          <AntDesign name="setting" size={20} color="gray" />
          <Text style={styles.menuText}>Cài đặt Ứng dụng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <AntDesign name="logout" size={20} color="red" />
          <Text style={styles.menuText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  profileHeader: {
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 80,
  },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  role: { fontSize: 14, color: 'gray' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  menuText: { marginLeft: 10, fontSize: 16 },
});
