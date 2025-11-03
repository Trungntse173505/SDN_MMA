import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const MOCK_FEEDBACK_DETAIL = {
    id: 'f2',
    subject: 'Lỗi sạc nhanh',
    customerName: 'Trần Thị Mai',
    description: 'Khách hàng báo sạc nhanh bị ngắt kết nối liên tục sau 10 phút sạc.',
    currentStatus: 'Đang xử lý',
    priority: 'Cao',
    logs: [
        { user: 'Nguyễn Văn A', action: 'Ghi nhận và xác nhận', date: '20/11/2025' },
        { user: 'Nguyễn Văn A', action: 'Chuyển cho bộ phận Kỹ thuật', date: '20/11/2025' },
    ]
};

export default function FeedbackDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const feedback = MOCK_FEEDBACK_DETAIL;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.subject}>{feedback.subject}</Text>
                <Text style={styles.customer}>Khách hàng: {feedback.customerName}</Text>
                <Text style={[styles.status, { color: Colors.primary, borderColor: Colors.primary }]}>
                    {feedback.currentStatus} | Ưu tiên: {feedback.priority}
                </Text>

                <Text style={styles.sectionTitle}>Mô tả</Text>
                <Text style={styles.description}>{feedback.description}</Text>
            </View>

            {/* LỊCH SỬ XỬ LÝ */}
            <Text style={styles.sectionTitle}>Lịch sử Xử lý</Text>
            <View style={styles.section}>
                {feedback.logs.map((log, index) => (
                    <View key={index} style={styles.logItem}>
                        <AntDesign size={16} color="green" />
                        <View style={styles.logContent}>
                            <Text style={styles.logAction}>{log.action}</Text>
                            <Text style={styles.logUser}>Bởi: {log.user} ({log.date})</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* CẬP NHẬT XỬ LÝ MỚI */}
            <Text style={styles.sectionTitle}>Cập nhật Xử lý mới</Text>
            <View style={styles.section}>
                <TextInput 
                    placeholder="Nhập hành động xử lý mới..." 
                    style={styles.textInput} 
                    multiline 
                />
                <TouchableOpacity style={styles.updateButton}>
                    <Text style={styles.updateButtonText}>Cập nhật Trạng thái & Ghi chú</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    section: { backgroundColor: 'white', padding: 16, marginVertical: 8 },
    subject: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    customer: { fontSize: 16, color: '#555', marginBottom: 10 },
    status: { fontSize: 14, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderRadius: 5, alignSelf: 'flex-start' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10, marginBottom: 8 },
    description: { fontSize: 14, lineHeight: 20 },
    
    logItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    logContent: { marginLeft: 10, flex: 1 },
    logAction: { fontWeight: 'bold', fontSize: 14 },
    logUser: { fontSize: 12, color: 'gray' },
    
    textInput: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
    updateButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
    updateButtonText: { color: 'white', fontWeight: 'bold' }
});