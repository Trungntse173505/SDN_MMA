import { useFetchProducts } from '@/hooks/useProducts';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CarCard from '../../components/CarCard';
import Colors from '../../constants/Colors';
import { CarData } from '../../interfaces/CarData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabHome() {
  const { products, loading, error } = useFetchProducts({ limit: 20 }); // Lấy tất cả products
  const [userName] = useState('Đại lý');
  const router = useRouter();

  const renderProductData = (item: any): CarData => ({
    id: item.id,
    name: `${item.name} (${item.version})`,
    price: item.basePrice,
    imageUrl: item.images[0],
    maxPowerHP: item.maxPowerHP,
    rangeKm: item.rangeKm,
    totalStock: item.totalStock,
  });

  const handlePressCar = (id: string) => {
    console.log('Pressed car id:', id); // debug
    router.push(`/car/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.fullCenter}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullCenter}>
        <Text style={styles.errorText}>Lỗi tải xe: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <View>
          <Text style={styles.greetingText}>Xin chào,</Text>
          <Text style={styles.title}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Feather name="bell" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      > */}

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => router.push('/search')}
        >
          <Feather name="search" size={18} color="#888" style={{ marginRight: 8 }} />
          <Text style={styles.searchText}>Tìm kiếm xe,giá bán...</Text>
          <Feather name="chevron-right" size={18} color="#bbb" />
        </TouchableOpacity>

        {/* Danh sách xe */}
        <Text style={styles.sectionTitle}>Danh sách xe</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 16, marginBottom: 20}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handlePressCar(item.id)}
              >
                <CarCard
                  car={renderProductData(item)}
                  style={{ width: '100%', alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d2d4e0ff' },
  fullCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  scrollContent: { paddingBottom: 30 },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: '#ffffffff',
    borderBottomWidth: 0.4,
    borderBottomColor: '#E6E6E6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  greetingText: { fontSize: 15, color: '#888' },
  title: { fontSize: 22, fontWeight: '700', color: Colors.text },
  bellButton: { backgroundColor: '#F4F4F6', borderRadius: 10, padding: 8 },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchText: { flex: 1, fontSize: 15, color: '#555' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: 20, marginTop: 26, marginBottom: 10, color: Colors.text },
  errorText: { color: 'red', textAlign: 'center', margin: 20 },
});
