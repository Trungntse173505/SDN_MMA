import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import AppointmentItem from '../../components/AppointmentItem'; 


interface AppointmentData {
    id: string;
    customerName: string;
    carModel: string;
    dateTime: string; 
    status: 'Sắp tới' | 'Hoàn thành' | 'Hủy'; 
}

const MOCK_APPOINTMENTS: AppointmentData[] = [
    { id: 'a1', customerName: 'Nguyễn Văn Nam', carModel: 'VF 8', dateTime: '10:00 - 25/11/2025', status: 'Sắp tới' },
    { id: 'a2', customerName: 'Trần Thị Mai', carModel: 'Model Y', dateTime: '14:30 - 20/10/2025', status: 'Hoàn thành' },
    { id: 'a3', customerName: 'Lê Văn Việt', carModel: 'VF 9', dateTime: '09:00 - 05/11/2025', status: 'Hủy' },
];

export default function AppointmentListScreen() {

    const handleDetailPress = (appointmentId: string) => {
        console.log(`Xem chi tiết lịch hẹn: ${appointmentId}`);
    };

    return (
        <View style={styles.container}>           
            {/* Bộ lọc Lịch hẹn */}
            <View style={styles.filterBar}>
                <Text style={styles.filterText}>Lọc theo:</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Text>Sắp tới</Text>
                    <Feather name="chevron-down" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_APPOINTMENTS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <AppointmentItem appointment={item} onDetailPress={handleDetailPress} />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, paddingTop: 60, backgroundColor: 'white' },
    filterBar: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    filterText: { marginRight: 10, color: 'gray' },
    filterButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 8, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 5 
    },
    addButton: { 
        marginLeft: 'auto', 
        backgroundColor: Colors.primary, 
        padding: 8, 
        borderRadius: 5, 
        justifyContent: 'center' 
    },
    list: { paddingHorizontal: 16, paddingVertical: 10 },
});