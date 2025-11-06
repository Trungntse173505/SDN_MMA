import { useFetchProducts } from '@/hooks/useProducts';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ComparisonTable from '../../components/ComparisonTable';
import Colors from '../../constants/Colors';
import { Product } from '@/interfaces/CarData';
import { useLocalSearchParams } from 'expo-router';

export default function CarComparisonScreen() {
  const { products: allCars = [], loading } = useFetchProducts({ limit: 30 });
  const [carsToCompare, setCarsToCompare] = useState<(Product & { selectedVariant?: any })[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id, color } = useLocalSearchParams<{ id?: string; color?: string }>();

  // ✅ Tự động thêm xe đầu tiên khi điều hướng từ trang chi tiết
  useEffect(() => {
    if (id && allCars.length > 0) {
      const car = allCars.find(c => c.id === id);
      if (car && !carsToCompare.some(c => c.id === car.id)) {
        if (color) {
          const variant = car.variants.find(v => v.attributeValue[0].value === color);
          const selectedCar = { ...car, selectedVariant: variant };
          setCarsToCompare([selectedCar]);
        } else {
          setCarsToCompare([car]);
        }
      }
    }
  }, [id, color, allCars]);

  // ✅ Xóa xe khỏi danh sách so sánh
  const handleRemoveCar = (id: string) => {
    setCarsToCompare(prev => prev.filter(car => car.id !== id));
  };

  // ✅ Thêm xe vào danh sách
  const handleSelectCar = (car: Product) => {
    setCarsToCompare(prev => [...prev, car]);
    setIsModalVisible(false);
  };

  const availableCars = allCars.filter(c => !carsToCompare.some(sel => sel.id === c.id));

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>So sánh xe</Text>

      {/* Danh sách xe đã chọn */}
      <View style={styles.selectionBar}>
        {carsToCompare.map(car => (
          <View key={car.id} style={styles.selectedCar}>
            <Text numberOfLines={1} style={styles.selectedCarText}>{car.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveCar(car.id)}>
              <Feather name="x-circle" size={16} color="#555" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Nút thêm xe */}
        {carsToCompare.length < 3 && (
          <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
            <Feather name="plus" size={20} color={Colors.primary} />
            <Text style={styles.addButtonText}>Thêm xe</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bảng so sánh */}
      <ScrollView>
        <ComparisonTable cars={carsToCompare} />
      </ScrollView>

      {/* MODAL chọn xe */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn xe để thêm</Text>

          {loading ? (
            <Text>Đang tải danh sách xe...</Text>
          ) : (
            <FlatList
              data={availableCars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectCar(item)}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                  <Feather name="plus-circle" size={18} color={Colors.primary} />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
                  Tất cả xe đã được chọn
                </Text>
              }
            />
          )}

          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#f0f0f0',
  },
  selectedCar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  selectedCarText: { fontSize: 13, fontWeight: '500', maxWidth: 100, marginRight: 6 },
  addButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { fontSize: 12, color: '#333', marginTop: 4 },
  modalContainer: { flex: 1, backgroundColor: 'white', padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  modalItemText: { fontSize: 16 },
  closeButton: { marginTop: 20, alignSelf: 'center' },
});
