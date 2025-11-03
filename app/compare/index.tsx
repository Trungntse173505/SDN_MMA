import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import ComparisonTable from '../../components/ComparisonTable';
import { CarData } from '../../interfaces/CarData'; // Đã thêm Import

// Định nghĩa Interface cho props
interface SelectedCarItemProps {
    car: CarData; 
    onRemove: (id: string) => void;
}

const MOCK_COMPARE_LIST: CarData[] = [
    { id: '1', name: 'Xe Tesla', price: 2500, power: '300 hp', battery: '80 kWh', range: '550 km', seatingCapacity: 5 },
    { id: '2', name: 'Xe VinFast', price: 1800, power: '200 hp', battery: '60 kWh', range: '400 km', seatingCapacity: 5 },
];

// Component đã được định nghĩa kiểu props
const SelectedCarItem: React.FC<SelectedCarItemProps> = ({ car, onRemove }) => (
    <View style={compareStyles.selectedCar}>
        <Text style={compareStyles.selectedCarText} numberOfLines={1}>{car.name}</Text>
        <TouchableOpacity onPress={() => onRemove(car.id)} style={compareStyles.removeButton}>
            <AntDesign  size={14} color="#555" />
        </TouchableOpacity>
    </View>
);


export default function CarComparisonScreen() {
  const carsToCompare = MOCK_COMPARE_LIST;

  const handleRemoveCar = (id: string) => {
    console.log(`Xóa xe ${id} khỏi danh sách so sánh`);
  };

  return (
    <View style={compareStyles.container}>
      <Text style={compareStyles.headerTitle}>So sánh Xe</Text>
      
      <View style={compareStyles.selectionBar}>
        {carsToCompare.map(car => (
            <SelectedCarItem key={car.id} car={car} onRemove={handleRemoveCar} />
        ))}
        {carsToCompare.length < 3 && ( 
            <TouchableOpacity style={compareStyles.addButton}>
                {/* ✅ SỬA LỖI: Sử dụng tên icon AntDesign hợp lệ */}
                <AntDesign size={24} color={Colors.primary} />
                <Text style={compareStyles.addButtonText}>Thêm xe</Text>
            </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={{padding: 0}}>
        <ComparisonTable cars={carsToCompare} />
      </ScrollView>
    </View>
  );
}

const compareStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#eee' },
    selectionBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, borderBottomWidth: 5, borderBottomColor: '#f0f0f0' },
    selectedCar: { backgroundColor: '#e6f7ff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: Colors.primary, flexDirection: 'row', alignItems: 'center' },
    selectedCarText: { fontSize: 14, marginRight: 5, fontWeight: '500' },
    removeButton: { marginLeft: 5 },
    addButton: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, width: 100 },
    addButtonText: { fontSize: 12, marginTop: 4 },
});