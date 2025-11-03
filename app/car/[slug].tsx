import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Dùng để lấy tham số động (slug)
import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

// Dữ liệu giả định chi tiết của một chiếc xe
const MOCK_CAR_DETAIL = {
    name: 'Honda Civic e:HEV RS',
    price: 1300, // Triệu VNĐ
    slug: 'honda-civic-ehev-rs',
    imageUrl: 'https://via.placeholder.com/600x400?text=Car+Detail+Image',
    specs: [
        { label: 'Công suất', value: '184 Mã lực' },
        { label: 'Pin', value: '60 kWh' },
        { label: 'Phạm vi di chuyển', value: '450 km' },
    ],
    // ... các thông tin cấu hình khác
};

export default function CarDetailScreen() {
  // Lấy tham số động (slug) từ đường dẫn. Ví dụ: /car/honda-civic-ehev-rs
  const { slug } = useLocalSearchParams<{ slug: string }>();

  // Giả lập việc tải dữ liệu chi tiết xe dựa trên slug
  // Trong thực tế: const { data: car, isLoading } = useFetchCarDetail(slug);
  const car = MOCK_CAR_DETAIL;

  if (!car) {
    return <Text style={styles.loadingText}>Đang tải hoặc không tìm thấy xe...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* ẢNH VÀ TIÊU ĐỀ */}
      <View style={styles.header}>
        <Image source={{ uri: car.imageUrl }} style={styles.carImage} resizeMode="cover" />
        <View style={styles.titleArea}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carPrice}>{car.price.toLocaleString()} Triệu VNĐ</Text>
        </View>
      </View>

      {/* CÁC NÚT HÀNH ĐỘNG */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="form" size={20} color="white" />
            <Text style={styles.actionText}>Tạo Báo giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSecondary}>
            <Feather name="refresh-ccw" size={20} color={Colors.primary} />
            <Text style={[styles.actionText, {color: Colors.primary}]}>Lái thử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compareIcon}>
            <Feather name="bar-chart-2" size={20} color={Colors.primary} />
            <Text style={{fontSize: 12, color: Colors.primary}}>So sánh</Text>
        </TouchableOpacity>
      </View>

      {/* THÔNG SỐ KỸ THUẬT */}
      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      <View style={styles.specsContainer}>
        {car.specs.map((spec, index) => (
            <View key={index} style={styles.specRow}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
            </View>
        ))}
      </View>
      
      {/* ... Các phần khác: Cấu hình, Màu sắc, Video Review ... */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    loadingText: { padding: 50, textAlign: 'center' },
    header: { marginBottom: 15 },
    carImage: { width: '100%', height: 250 },
    titleArea: { paddingHorizontal: 16 },
    carName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
    carPrice: { fontSize: 20, color: '#E91E63', fontWeight: '600', marginTop: 4 },
    
    actionContainer: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 15, justifyContent: 'space-between', alignItems: 'center' },
    actionButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10, justifyContent: 'center' },
    actionText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },
    actionButtonSecondary: { borderWidth: 1, borderColor: Colors.primary, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
    compareIcon: { padding: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 8 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10, marginBottom: 8 },
    specsContainer: { paddingHorizontal: 16, paddingBottom: 20 },
    specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    specLabel: { fontSize: 14, color: 'gray' },
    specValue: { fontSize: 14, fontWeight: '500' },
});