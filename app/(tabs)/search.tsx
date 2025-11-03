import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CarCard from '../../components/CarCard';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { CarData } from '../../interfaces/CarData';
import Colors from '../../constants/Colors'; 

// Dữ liệu giả định
const carList: CarData[] = [
    { id: '1', name: 'Mẫu A', price: 900, status: 'Còn hàng' }, 
    { id: '2', name: 'Mẫu B', price: 1200, status: 'Hết hàng' },
    { id: '3', name: 'Mẫu C', price: 750, status: 'Còn hàng' },
];

export default function TabSearch() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign size={20} color="gray" style={{marginRight: 8}} />
        <TextInput placeholder="Tìm kiếm theo tên xe, màu sắc..." style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
            <AntDesign name="filter" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={carList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <CarCard car={item} showCompareButton={true} /> 
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.comparePin}>
        <Text style={styles.compareText}>2 xe đã chọn để so sánh</Text>
        <Link href="/compare" asChild>
            <TouchableOpacity style={styles.compareButton}>
                <Text style={styles.compareButtonText}>So sánh</Text>
            </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    searchBar: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#eee' },
    searchInput: { flex: 1, padding: 8 },
    filterButton: { padding: 8 },
    list: { padding: 16 },
    comparePin: { backgroundColor: '#333', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    compareText: { color: 'white', fontSize: 16 },
    compareButton: { backgroundColor: 'orange', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
    compareButtonText: { color: 'white', fontWeight: 'bold' }
});