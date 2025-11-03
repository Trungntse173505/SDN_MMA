import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


const MOCK_CUSTOMER_DETAIL = {
    id: 'c1',
    name: 'Nguyễn Văn Nam',
    phone: '0901xxxxxx',
    email: 'nam.nv@example.com',
    address: 'Q. 1, TP. HCM',
    status: 'Tiềm năng',
    history: [
        { type: 'Báo giá', content: 'Honda Civic, 900M', date: '01/10/2025' },
        { type: 'Lịch hẹn', content: 'Lái thử VF 8', date: '15/10/2025' },
        { type: 'Phản hồi', content: 'Góp ý về tư vấn', date: '20/10/2025' },
    ]
};

export default function CustomerDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const customer = MOCK_CUSTOMER_DETAIL; 

    const handleCreateAppointment = () => { console.log('Mở Modal tạo lịch hẹn'); };
    const handleCreateFeedback = () => { console.log('Mở Modal ghi nhận phản hồi'); };

    return (
        <ScrollView style={styles.container}>
            
            {/* THÔNG TIN CƠ BẢN */}
            <View style={styles.section}>
                <Text style={styles.name}>{customer.name}</Text>
                <Text style={styles.statusBadge}>Trạng thái: {customer.status}</Text>
                <View style={styles.contactRow}>
                    <Feather name="phone" size={16} color="gray" />
                    <Text style={styles.contactText}>{customer.phone}</Text>
                </View>
                <View style={styles.contactRow}>
                    <Feather name="mail" size={16} color="gray" />
                    <Text style={styles.contactText}>{customer.email}</Text>
                </View>
                <View style={styles.contactRow}>
                    <Feather name="map-pin" size={16} color="gray" />
                    <Text style={styles.contactText}>{customer.address}</Text>
                </View>
            </View>

            {/* CÁC HÀNH ĐỘNG */}
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleCreateAppointment}>
                    <Feather name="calendar" size={20} color="white" />
                    <Text style={styles.actionText}>Hẹn Lái thử</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: 'orange'}]} onPress={handleCreateFeedback}>
                    <AntDesign  size={20} color="white" />
                    <Text style={styles.actionText}>Ghi nhận P/H</Text>
                </TouchableOpacity>
            </View>

            {/* LỊCH SỬ GIAO DỊCH/HẸN */}
            <Text style={styles.sectionTitle}>Lịch sử Hoạt động</Text>
            <View style={styles.section}>
                {customer.history.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                        <AntDesign  size={14} color="#aaa" />
                        <View style={styles.historyContent}>
                            <Text style={styles.historyType}>{item.type}</Text>
                            <Text style={styles.historyDetail}>{item.content}</Text>
                        </View>
                        <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    section: { backgroundColor: 'white', padding: 16, marginVertical: 8 },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    statusBadge: { fontSize: 14, color: 'darkgreen', marginBottom: 15 },
    contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    contactText: { marginLeft: 10, fontSize: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10 },

    actionContainer: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 5, justifyContent: 'space-between' },
    actionButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: 5, justifyContent: 'center' },
    actionText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
    
    historyItem: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    historyContent: { flex: 1, marginLeft: 10 },
    historyType: { fontWeight: 'bold', fontSize: 14 },
    historyDetail: { fontSize: 12, color: '#555' },
    historyDate: { fontSize: 12, color: 'gray' },
});