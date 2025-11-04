import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CarCard from '../../components/CarCard';
import { Link } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons'; // Import Feather cho icon rõ hơn
import { CarData } from '../../interfaces/CarData';
import Colors from '../../constants/Colors'; 

// Dữ liệu giả định (làm giàu)
const carList: CarData[] = [
    { id: '1', name: 'VF 8 Plus', price: 900, status: 'Còn hàng', imageUrl: 'URL_A' }, 
    { id: '2', name: 'Tesla Model 3', price: 1200, status: 'Hết hàng', imageUrl: 'URL_B' },
    { id: '3', name: 'Ioniq 5', price: 750, status: 'Còn hàng', imageUrl: 'URL_C' },
];

const FILTER_TAGS = ['Sẵn hàng', 'Xe mới về', 'Sedan', 'SUV', 'Giá dưới 1 tỷ'];


export default function TabSearch() {
  const selectedCount = 2; // Giả định số lượng xe đang chọn

  return (
    <View style={styles.container}>
      
      {/* 1. Thanh Tìm kiếm Nổi bật */}
      <View style={styles.searchBar}>
        <AntDesign size={20} color="gray" style={{marginRight: 8}} /> 
        <TextInput placeholder="Tìm kiếm theo tên xe, màu sắc..." style={styles.searchInput} />
        
        {/* Nút mở Modal lọc nâng cao */}
        <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 2. Thanh Bộ lọc nhanh (Quick Filter Bar) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickFilterContainer}>
        {FILTER_TAGS.map((tag, index) => (
          <TouchableOpacity key={index} style={styles.filterTag}>
            <Text style={styles.filterTagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 3. Danh sách Xe */}
      <FlatList
        data={carList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <CarCard car={item} showCompareButton={true} /> 
        )}
        contentContainerStyle={styles.list}
      />

      {/* 4. Thanh So sánh (COMPARE PIN) - Thiết kế lại */}
      {selectedCount > 0 && (
          <View style={styles.comparePin}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="swap" size={20} color="white" style={{marginRight: 10}} />
                <Text style={styles.compareText}>Đã chọn {selectedCount} xe để so sánh</Text>
            </View>
            <Link href="/compare" asChild>
                <TouchableOpacity style={styles.compareButton}>
                    <Text style={styles.compareButtonText}>SO SÁNH NGAY</Text>
                    <AntDesign name="right" size={14} color="#333" style={{marginLeft: 5}} />
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
    filterButton: { padding: 8, marginLeft: 10 },
    
    // Quick Filter Styles
    quickFilterContainer: { 
        paddingVertical: 10, 
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    filterTag: {
        backgroundColor: Colors.background,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    filterTagText: {
        fontSize: 14,
        color: Colors.text,
    },
    
    list: { padding: 16 },
    
    // Compare Pin Styles (Đã làm đẹp lại)
    comparePin: { 
        backgroundColor: Colors.primary, // Dùng màu chủ đạo
        padding: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        elevation: 10,
    },
    compareText: { 
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    compareButton: { 
        backgroundColor: 'white', // Nút màu trắng nổi bật
        paddingHorizontal: 15, 
        paddingVertical: 8, 
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    compareButtonText: { 
        color: '#333', 
        fontWeight: 'bold' 
    }
});