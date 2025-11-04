import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router'; 

// Khai báo Interface cho dữ liệu Phản hồi/Khiếu nại
interface FeedbackData {
    id: string;
    customerName: string;
    subject: string;
    type: 'Phản hồi' | 'Khiếu nại';
    status: 'Mới' | 'Đang xử lý' | 'Đã đóng';
    date: string;
}

// Dữ liệu giả định
const MOCK_FEEDBACKS: FeedbackData[] = [
    { id: 'f1', customerName: 'Nguyễn Văn Nam', subject: 'Thắc mắc về pin', type: 'Phản hồi', status: 'Mới', date: '25/11/2025' },
    { id: 'f2', customerName: 'Trần Thị Mai', subject: 'Lỗi sạc nhanh', type: 'Khiếu nại', status: 'Đang xử lý', date: '24/11/2025' },
    { id: 'f3', customerName: 'Phạm Công Toàn', subject: 'Yêu cầu bồi thường', type: 'Khiếu nại', status: 'Đã đóng', date: '15/11/2025' },
];

const FeedbackItem: React.FC<{feedback: FeedbackData}> = ({ feedback }) => {
    // Định nghĩa màu cho trạng thái (Status)
    const statusColor = feedback.status === 'Mới' ? Colors.secondary : 
                         feedback.status === 'Đang xử lý' ? Colors.primary : 'green';
    
    // Đã FIX: Sử dụng tên icon cố định, không dùng 'as any'
    const iconName = feedback.type === 'Khiếu nại' ? 'warning' : 'message1'; 
    
    return (
        <Link href={`/feedback/${feedback.id}` as any} asChild>
            <TouchableOpacity style={feedbackStyles.item}>
                
                {/* 1. Thanh màu nhấn mạnh (Status bar) */}
                <View style={[feedbackStyles.statusBar, { backgroundColor: statusColor }]} />
                
                {/* 2. Phần thông tin chính */}
                <View style={feedbackStyles.mainContent}>
                    
                    {/* Hàng trên: Chủ đề và Ngày */}
                    <View style={feedbackStyles.headerRow}>
                        <Text style={feedbackStyles.subject} numberOfLines={1}>{feedback.subject}</Text>
                        <Text style={feedbackStyles.dateText}>{feedback.date}</Text>
                    </View>
                    
                    {/* Hàng dưới: Khách hàng và Loại vấn đề */}
                    <Text style={feedbackStyles.customer}>
                        {feedback.customerName} 
                        <Text style={feedbackStyles.typeText}> ({feedback.type})</Text>
                    </Text>
                </View>
                
                {/* 3. Badge Trạng thái và Icon */}
                <View style={feedbackStyles.rightBlock}>
                    <Text style={[feedbackStyles.statusBadge, { color: statusColor, borderColor: statusColor }]}>
                        {feedback.status.toUpperCase()}
                    </Text>
                    {/* Icon mũi tên chỉ hướng chi tiết */}
                    <AntDesign name="right" size={14} color="#aaa" style={{marginTop: 5}}/>
                </View>
            </TouchableOpacity>
        </Link>
    );
};


export default function FeedbackListScreen() {
    return (
        <View style={feedbackStyles.container}>      
            {/* Thanh điều khiển (Lọc và Thêm mới) */}
            <View style={feedbackStyles.controls}>
                <TouchableOpacity style={feedbackStyles.controlButton}>
                    <Feather name="filter" size={16} color={Colors.text} />
                    <Text style={{marginLeft: 5}}>Lọc theo Trạng thái</Text>
                </TouchableOpacity>
                
                {/* Nút Thêm mới */}
                <Link href="/modal?type=newFeedback" asChild> 
                    <TouchableOpacity style={[feedbackStyles.addButton, {backgroundColor: Colors.primary}]}>
                        <Feather name="plus" size={20} color="white" />
                        <Text style={feedbackStyles.addButtonText}>Ghi nhận</Text>
                    </TouchableOpacity>
                </Link>
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
    controls: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between' },
    controlButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 5,
        marginRight: 10,
    },
    addButton: { 
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10, 
        borderRadius: 5, 
    },
    addButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },
    list: { paddingHorizontal: 0, paddingVertical: 10 },
    item: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15, 
        backgroundColor: 'white', 
        borderRadius: 8, 
        marginVertical: 4, 
        marginHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    statusBar: {
        width: 6,
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    mainContent: {
        flex: 1,
        marginLeft: 8, 
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    subject: { 
        fontSize: 16, 
        fontWeight: '700',
        flex: 1,
        marginRight: 10,
    },
    customer: { 
        fontSize: 13, 
        color: '#666',
    },
    typeText: { 
        fontWeight: 'bold',
        color: '#888',
    },
    
    // Right Block (Status)
    rightBlock: {
        alignItems: 'flex-end',
        justifyContent: 'center', 
        minWidth: 80,
    },
    statusBadge: { 
        fontSize: 10, 
        fontWeight: 'bold', 
        paddingHorizontal: 6, 
        paddingVertical: 3, 
        borderWidth: 1, 
        borderRadius: 5,
        marginBottom: 5,
    },
    dateText: { 
        fontSize: 10, 
        color: 'gray', 
    }
});