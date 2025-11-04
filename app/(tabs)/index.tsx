// app/(tabs)/index.tsx - Đã sửa lỗi Icon

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import CarCard from '../../components/CarCard'; 
import { AntDesign, Feather } from '@expo/vector-icons';
import { CarData } from '../../interfaces/CarData'; 
import Colors from '../../constants/Colors'; 

// Dữ liệu giả định (Giữ nguyên)
const carsData: CarData[] = [
    { id: '1', name: 'Mẫu A - VF 8', price: 900, power: '180 hp', imageUrl: 'https://vinfast-cars.vn/wp-content/uploads/2025/02/vinfast-vf8-xam.png' }, 
    { id: '2', name: 'Mẫu B - Model Y', price: 1200, power: '150 hp', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qJFBjIrrQ7QsW5VFk3HYe4oF8-N1acCFjg&s' }
];

export default function TabHome() {
    return (
        <View style={styles.container}>
            
            {/* Vùng Header Tùy chỉnh (Top Bar) */}
            <View style={styles.customHeader}>
                <Text style={styles.title}>Xin chào, Đại lý!</Text>
                <Feather name="bell" size={24} color={Colors.text} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 1. Thanh Tìm kiếm và Danh mục */}
                <Link href="/search" asChild>
                    <TouchableOpacity style={styles.searchButton}>
                        <AntDesign size={18} color="gray" /> 
                        <Text style={styles.searchText}>Tìm kiếm xe, cấu hình, giá bán...</Text>
                        <Feather name="chevron-right" size={18} color="gray" />
                    </TouchableOpacity>
                </Link>

                {/* 2. DANH SÁCH XE NỔI BẬT (Ưu tiên số 1) */}
                <Text style={styles.sectionTitle}>Các mẫu xe đang hot</Text>
                <FlatList
                    data={carsData}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CarCard car={item} style={styles.carCard} />}
                    contentContainerStyle={{paddingLeft: 16}}
                />
                
                {/* 3. Chức năng Nhanh (Gọn gàng hơn) */}
                <Text style={styles.sectionTitle}>Công cụ</Text>
                <View style={styles.quickActions}>
                    
                    {/* So sánh xe */}
                    <Link href="/compare" asChild>
                        <TouchableOpacity style={styles.actionItem}>
                            <AntDesign name="swap" size={20} color={Colors.primary} />
                            <Text style={styles.actionText}>So sánh</Text>
                        </TouchableOpacity>
                    </Link>
                    
                    {/* Tạo báo giá */}
                    <TouchableOpacity style={styles.actionItem}>
                        <AntDesign name="form" size={20} color={Colors.primary} />
                        <Text style={styles.actionText}>Báo giá</Text>
                    </TouchableOpacity>
                    
                    {/* Lịch hẹn */}
                    <Link href="/appointments" asChild>
                        <TouchableOpacity style={styles.actionItem}>
                            <Feather name="calendar" size={20} color={Colors.primary} />
                            <Text style={styles.actionText}>Lịch hẹn</Text>
                        </TouchableOpacity>
                    </Link>

                     {/* Ghi nhận P/H */}
                    <Link href="/feedback/index" asChild>
                        <TouchableOpacity style={styles.actionItem}>
                            <AntDesign  size={20} color={Colors.primary} /> 
                            <Text style={styles.actionText}>P/H & K/N</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* 4. Tin tức/Khuyến mãi */}
                <Text style={styles.sectionTitle}>💡 Tin tức & Khuyến mãi</Text>
                <View style={styles.promoBanner}>
                    <Text style={styles.promoText}>Cập nhật giá bán, cấu hình mới nhất!</Text>
                </View>
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scrollContent: { paddingBottom: 20 },
    customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
    searchButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 16, marginTop: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
    searchText: { marginLeft: 10, fontSize: 16, color: '#555', flex: 1 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', margin: 16, marginBottom: 10, color: Colors.text },
    quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 },
    actionItem: { padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: '23%', backgroundColor: 'white', borderWidth: 1, borderColor: '#eee' }, 
    actionText: { color: Colors.text, marginTop: 5, fontSize: 11, fontWeight: '600', textAlign: 'center' },
    promoBanner: { height: 80, backgroundColor: Colors.primary, borderRadius: 12, marginHorizontal: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    promoText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    carCard: { marginRight: 15, width: 280 }
});