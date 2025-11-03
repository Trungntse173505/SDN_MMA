import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import CarCard from '../../components/CarCard'; 
import { AntDesign } from '@expo/vector-icons';
import { CarData } from '../../interfaces/CarData'; 
import Colors from '../../constants/Colors'; 

// Dữ liệu giả định
const carsData: CarData[] = [
    { id: '1', name: 'Mẫu A - Civic RS', price: 900, power: '180 hp' }, 
    { id: '2', name: 'Mẫu B - HRV', price: 1200, power: '150 hp' }
];

export default function TabHome() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header/Thanh tìm kiếm */}
        <View style={styles.header}>
          <Text style={styles.title}>Xin chào, Đại lý!</Text>
          <Link href="/search" style={styles.searchButton}>
            <Text>Tìm kiếm xe, khách hàng... </Text>
            <AntDesign  size={16} color="gray" />
          </Link>
        </View>

        {/* Chức năng Nhanh */}
        <View style={styles.quickActions}>
          <Link href="/compare" asChild>
            <TouchableOpacity style={styles.actionItem}>
                <AntDesign name="swap" size={24} color="white" />
                <Text style={styles.actionText}>So sánh xe</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.actionItem}>
            <AntDesign name="form" size={24} color="white" />
            <Text style={styles.actionText}>Tạo báo giá</Text>
          </TouchableOpacity>
          
          {/* ✅ Thêm nút truy cập nhanh đến Feedback */}
          <Link href="/feedback/index" asChild>
             <TouchableOpacity style={[styles.actionItem, {backgroundColor: Colors.secondary, marginTop: 10}]}>
                <AntDesign size={24} color="white" />
                <Text style={styles.actionText}>Ghi nhận P/H</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Danh sách Xe Nổi bật */}
        <Text style={styles.sectionTitle}>🔥 Xe Hot trong tháng</Text>
        <FlatList
          data={carsData}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CarCard car={item} style={styles.carCard} />}
        />

        {/* Các mục khác */}
        <Text style={styles.sectionTitle}>💡 Tin tức & Khuyến mãi</Text>
        <View style={{ height: 150, backgroundColor: '#f0f0f0', borderRadius: 8, marginHorizontal: 16 }}>
            <Text style={{padding: 10}}>Banner Khuyến mãi lớn...</Text>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    scrollContent: { paddingBottom: 20 },
    header: { padding: 16, paddingTop: 60, backgroundColor: '#f7f7f7' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    searchButton: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
    quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, flexWrap: 'wrap', paddingHorizontal: 16 }, // Sửa wrap và padding
    actionItem: { backgroundColor: Colors.primary, padding: 15, borderRadius: 10, alignItems: 'center', width: '47%' }, // Điều chỉnh width
    actionText: { color: 'white', marginTop: 5, fontSize: 14 },
    sectionTitle: { fontSize: 18, fontWeight: '600', margin: 16, marginBottom: 10 },
    carCard: { marginRight: 10, width: 250 }
});