import { useFetchProducts } from '@/hooks/useProducts';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import CarCard from '../../components/CarCard';
import Colors from '../../constants/Colors';

const PRICE_FILTERS = [
  { label: 'Dưới 1 tỷ', min: 0, max: 1_000_000_000 },
  { label: '1 - 2 tỷ', min: 1_000_000_000, max: 2_000_000_000 },
  { label: '2 - 3 tỷ', min: 2_000_000_000, max: 3_000_000_000 },
  { label: 'Trên 3 tỷ', min: 3_000_000_000, max: Infinity },
];

export default function TabSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const { products, loading, error, pagination, fetchProducts } = useFetchProducts({ page, limit: 20 });

  useEffect(() => {
    fetchProducts({ keyword, page: 1 });
    setPage(1);
  }, [keyword]);

  const filteredProducts = useMemo(
    () =>
      products
        .map(p => ({
          id: p.id,
          name: `${p.name} (${p.version})`,
          price: p.basePrice,
          imageUrl: p.images?.[0] || '',
          maxPowerHP: p.maxPowerHP || 0,
          rangeKm: p.rangeKm || 0,
          totalStock: p.totalStock,
        }))
        .filter(p =>
          selectedPrice !== null
            ? p.price >= PRICE_FILTERS[selectedPrice].min && p.price < PRICE_FILTERS[selectedPrice].max
            : true
        ),
    [products, selectedPrice]
  );

  const selectedCount = 2;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesign size={20} color="gray" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Tìm kiếm theo tên xe, phiên bản..."
          style={styles.searchInput}
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      {/* Price Filters */}
      <View style={styles.filterContainer}>
        {PRICE_FILTERS.map((f, i) => {
          const selected = selectedPrice === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.filterTag, selected && styles.filterTagActive]}
              onPress={() => setSelectedPrice(selected ? null : i)}
            >
              <Text style={[styles.filterTagText, selected && styles.filterTagTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List of Cars */}
      {loading || error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          {loading ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/car/${item.id}`)} activeOpacity={0.9}>
              <CarCard car={item} showCompareButton />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
          onEndReached={() => page < pagination.totalPages && setPage(prev => prev + 1)}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Compare Pin */}
      {selectedCount > 0 && (
        <View style={styles.comparePin}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="swap" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.compareText}>Đã chọn {selectedCount} xe để so sánh</Text>
          </View>
          <Link href="/compare" asChild>
            <TouchableOpacity style={styles.compareButton}>
              <Text style={styles.compareButtonText}>SO SÁNH NGAY</Text>
              <AntDesign name="right" size={14} color="#333" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
  searchInput: { flex: 1, padding: 8, fontSize: 16 },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  filterTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8 },
  filterTagActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterTagText: { fontSize: 14, color: Colors.text },
  filterTagTextActive: { color: 'white' },
  list: { padding: 16 },
  comparePin: { backgroundColor: Colors.primary, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 10 },
  compareText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  compareButton: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
  compareButtonText: { color: '#333', fontWeight: 'bold' },
});
