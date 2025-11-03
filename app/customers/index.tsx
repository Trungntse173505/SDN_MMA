import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomerCard from '../../components/CustomerCard';
import Colors from '../../constants/Colors';
// Đã thêm Interface CustomerData để code Typescript an toàn hơn
interface CustomerData { id: string; name: string; phone: string; status: 'Tiềm năng' | 'Đã mua' | 'Cũ'; carOfInterest?: string; }

// Dữ liệu giả định
const MOCK_CUSTOMERS: CustomerData[] = [
    { id: 'c1', name: 'Nguyễn Văn Nam', phone: '0901xxxxxx', status: 'Tiềm năng', carOfInterest: 'VinFast VF 8' },
    { id: 'c2', name: 'Trần Thị Mai', phone: '0912xxxxxx', status: 'Đã mua', carOfInterest: 'Tesla Model Y' },
    { id: 'c3', name: 'Lê Văn Việt', phone: '0987xxxxxx', status: 'Cũ' },
];

export default function CustomerListScreen() {

    const handleCreateAppointment = (customerId: string) => {
        // Chuyển hướng đến form tạo lịch hẹn, điền sẵn customerId
        console.log(`Chuyển đến tạo lịch hẹn cho khách: ${customerId}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Hồ sơ Khách hàng</Text>
            
            <View style={styles.controls}>
                <View style={styles.searchBar}>
                    <AntDesign size={18} color="gray" />
                    <TextInput placeholder="Tìm khách hàng theo tên, SĐT" style={styles.searchInput} />
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_CUSTOMERS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CustomerCard customer={item} onAppointmentPress={handleCreateAppointment} />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, paddingTop: 60, backgroundColor: 'white' },
    controls: { flexDirection: 'row', padding: 16, alignItems: 'center', backgroundColor: 'white' },
    searchBar: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#f0f0f0', 
        padding: 10, 
        borderRadius: 8, 
        marginRight: 10 
    },
    searchInput: { flex: 1, marginLeft: 8 },
    addButton: { 
        backgroundColor: Colors.primary, 
        padding: 10, 
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    list: { paddingHorizontal: 16, paddingVertical: 10 },
});