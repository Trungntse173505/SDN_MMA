import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

// Khai báo Interface cho dữ liệu Phản hồi/Khiếu nại
interface FeedbackData {
    id: string;
    customerName: string;
    subject: string;
    type: 'Phản hồi' | 'Khiếu nại';
    status: 'Mới' | 'Đang xử lý' | 'Đã đóng';
}

// Dữ liệu giả định
const MOCK_FEEDBACKS: FeedbackData[] = [
    { id: 'f1', customerName: 'Nguyễn Văn Nam', subject: 'Thắc mắc về pin', type: 'Phản hồi', status: 'Mới' },
    { id: 'f2', customerName: 'Trần Thị Mai', subject: 'Lỗi sạc nhanh', type: 'Khiếu nại', status: 'Đang xử lý' },
];

const FeedbackItem: React.FC<{feedback: FeedbackData}> = ({ feedback }) => {
    const statusColor = feedback.status === 'Mới' ? Colors.secondary : 
                        feedback.status === 'Đang xử lý' ? Colors.primary : 'green';
    
    return (
        <TouchableOpacity style={feedbackStyles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign size={20} color="#555" />
                <View style={feedbackStyles.info}>
                    <Text style={feedbackStyles.subject}>{feedback.subject}</Text>
                    <Text style={feedbackStyles.customer}>{feedback.customerName} ({feedback.type})</Text>
                </View>
            </View>
            <Text style={[feedbackStyles.status, { color: statusColor, borderColor: statusColor }]}>
                {feedback.status}
            </Text>
        </TouchableOpacity>
    );
};


export default function FeedbackListScreen() {
    return (
        <View style={feedbackStyles.container}>
            <Text style={feedbackStyles.headerTitle}>Ghi nhận Phản hồi & Khiếu nại</Text>
            
            {/* Thanh điều khiển */}
            <View style={feedbackStyles.controls}>
                <TouchableOpacity style={feedbackStyles.controlButton}>
                    <Text>Lọc theo Trạng thái</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[feedbackStyles.controlButton, {marginLeft: 'auto'}]}>
                    <Feather name="plus" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_FEEDBACKS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FeedbackItem feedback={item} />}
                contentContainerStyle={feedbackStyles.list}
            />
        </View>
    );
}

const feedbackStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, paddingTop: 60, backgroundColor: 'white' },
    controls: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    controlButton: { flexDirection: 'row', alignItems: 'center', padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    
    list: { paddingHorizontal: 16, paddingVertical: 10 },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'white', borderRadius: 8, marginVertical: 6, borderWidth: 1, borderColor: '#eee' },
    info: { marginLeft: 10, flex: 1 },
    subject: { fontSize: 16, fontWeight: '600' },
    customer: { fontSize: 12, color: 'gray' },
    status: { fontSize: 12, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 3, borderWidth: 1, borderRadius: 5 },
});