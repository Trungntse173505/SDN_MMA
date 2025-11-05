import { useFetchProductDetail } from '@/hooks/useProductDetail'; // hook thật
import { AntDesign, Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error, fetchProductDetail } = useFetchProductDetail();

  useEffect(() => {
    if (id) {
      fetchProductDetail(id); 
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }


  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Không tìm thấy xe hoặc lỗi tải dữ liệu.</Text>
      </View>
    );
  }


  const handleCompare = () => {
    router.push("/compare")
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.carImage} />
      <View style={styles.titleArea}>
        <Text style={styles.carName}>{product.name} ({product.version})</Text>
        <Text style={styles.carPrice}>{product.basePrice.toLocaleString()} Triệu VNĐ</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="form" size={20} color="white" />
          <Text style={styles.actionText}>Tạo Báo giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <Feather name="refresh-ccw" size={20} color={Colors.primary} />
          <Text style={[styles.actionText, { color: Colors.primary }]}>Lái thử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compareIcon} onPress={() => handleCompare()}>
          <Feather name="bar-chart-2" size={20} color={Colors.primary} />
          <Text style={{ fontSize: 12, color: Colors.primary }}>So sánh</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      <View style={styles.specsContainer}>
        <View style={styles.specRow}><Text style={styles.specLabel}>Công suất</Text><Text style={styles.specValue}>{product.maxPowerHP} HP</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Pin</Text><Text style={styles.specValue}>{product.batteryKWh} kWh</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Phạm vi di chuyển</Text><Text style={styles.specValue}>{product.rangeKm} km</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Tồn kho</Text><Text style={styles.specValue}>{product.totalStock}</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  carImage: { width: '100%', height: 250 },
  titleArea: { paddingHorizontal: 16, paddingVertical: 10 },
  carName: { fontSize: 24, fontWeight: 'bold' },
  carPrice: { fontSize: 20, color: '#E91E63', fontWeight: '600', marginTop: 4 },

  actionContainer: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 15, justifyContent: 'space-around', alignItems: 'center' },
  actionButton: { backgroundColor: Colors.primary, padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 5, justifyContent: 'center' },
  actionButtonSecondary: { borderWidth: 1, borderColor: Colors.primary, padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  compareIcon: { paddingHorizontal: 6, paddingVertical: 2,alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#eee',flex: 0.5, borderRadius: 8, marginLeft: 5 },
  actionText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10, marginBottom: 8 },
  specsContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  specLabel: { fontSize: 14, color: 'gray' },
  specValue: { fontSize: 14, fontWeight: '500' },
});
