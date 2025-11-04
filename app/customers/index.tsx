import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

interface CustomerData {
    id: string;
    maKhachHang: string;
    name: string;
    trangThai: 'Hợp đồng' | 'Tiềm năng' | 'Hủy';
    nguonKhachHang: string;
    loaiHinh: 'VF 8' | 'Model Y' | 'Ioniq 5' | 'EQB' | 'EV9'; 
    nhomKhachHang: 'Khách lẻ' | 'Doanh nghiệp';
}

const MOCK_CUSTOMERS: CustomerData[] = [
    { id: 'c1', maKhachHang: 'KH00024', name: 'Nguyễn Văn Nam', nguonKhachHang: 'Trực tiếp', loaiHinh: 'VF 8', trangThai: 'Hợp đồng', nhomKhachHang: 'Khách lẻ' },
    { id: 'c2', maKhachHang: 'KH00023', name: 'Lưu Thị Mùi', nguonKhachHang: 'Trực tiếp', loaiHinh: 'Model Y', trangThai: 'Hợp đồng', nhomKhachHang: 'Khách lẻ' },
    { id: 'c3', maKhachHang: 'KH00026', name: 'Nhà hàng Goggi House', nguonKhachHang: 'Cộng tác viên', loaiHinh: 'EQB', trangThai: 'Hợp đồng', nhomKhachHang: 'Doanh nghiệp' },
    { id: 'c4', maKhachHang: 'KH00022', name: 'Nguyễn Công Minh', nguonKhachHang: 'Tiếp thị', loaiHinh: 'Ioniq 5', trangThai: 'Tiềm năng', nhomKhachHang: 'Khách lẻ' },
    { id: 'c5', maKhachHang: 'KH00019', name: 'Phạm Công Toàn', nguonKhachHang: 'Trực tiếp', loaiHinh: 'VF 8', trangThai: 'Hợp đồng', nhomKhachHang: 'Khách lẻ' },
];

// COMPONENT KHÁCH HÀNG DẠNG THẺ
const CustomerItemCard: React.FC<{ customer: CustomerData }> = ({ customer }) => {
    const router = useRouter(); 

    const handlePress = () => {
        // ✅ THÊM LOGIC TRỎ QUA CHI TIẾT
        router.push({ pathname: "/customers/[id]", params: { id: customer.id } } as any);
    };

    const getStatusStyle = (status: CustomerData['trangThai']) => {
        if (status === 'Hợp đồng') return { color: 'green', backgroundColor: '#e8f5e9' };
        if (status === 'Tiềm năng') return { color: Colors.secondary, backgroundColor: '#fff8e1' };
        return { color: 'red', backgroundColor: '#ffebee' };
    };

    return (
        <TouchableOpacity style={itemStyles.card} onPress={handlePress}>
            
            {/* DÒNG 1: Tên & Mã Khách hàng */}
            <View style={itemStyles.header}>
                <Text style={itemStyles.nameText} numberOfLines={1}>{customer.name}</Text>
                <Text style={itemStyles.idText}>{customer.maKhachHang}</Text>
            </View>

            {/* DÒNG 2: Trạng thái và Nhóm khách hàng (Tag) */}
            <View style={itemStyles.tagsContainer}>
                <Text style={[itemStyles.tag, getStatusStyle(customer.trangThai)]}>
                    {customer.trangThai}
                </Text>
                <Text style={itemStyles.tag}>
                    {customer.nhomKhachHang}
                </Text>
                {/* HIỂN THỊ MẪU XE QUAN TÂM */}
                <Text style={itemStyles.tag}>
                    Xe: {customer.loaiHinh}
                </Text>
            </View>

            {/* DÒNG 3: Nguồn và Người phụ trách (Icons) */}
            <View style={itemStyles.footer}>
                <Text style={itemStyles.sourceText}>Nguồn: {customer.nguonKhachHang}</Text>
                <View style={itemStyles.iconGroup}>
                    {/* Người phụ trách */}
                    <Feather name="user" size={16} color="gray" style={{marginRight: 8}} />
                    {/* ✅ FIX CÚ PHÁP: Thêm name="bells" */}
                    <AntDesign size={16} color="gray" /> 
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default function CustomerListScreen() {
    return (
        <View style={styles.container}> 
            {/* Thanh điều khiển & Tìm kiếm */}
            <View style={styles.controls}>
                <View style={styles.searchBar}>
                    {/* ✅ FIX CÚ PHÁP: Thêm name="search1" */}
                    <AntDesign  size={18} color="gray" /> 
                    <TextInput placeholder="Tìm hồ sơ khách hàng..." style={styles.searchInput} />
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* DANH SÁCH KHÁCH HÀNG DẠNG THẺ */}
            <FlatList
                data={MOCK_CUSTOMERS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CustomerItemCard customer={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, paddingTop: 60, backgroundColor: 'white' },
    controls: { flexDirection: 'row', padding: 16, alignItems: 'center', backgroundColor: 'white', marginBottom: 5 },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, marginRight: 10 },
    searchInput: { flex: 1, marginLeft: 8 },
    addButton: { backgroundColor: Colors.primary, padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    list: { paddingHorizontal: 16, paddingVertical: 10 },
});

// Styles riêng cho component Card/Item
const itemStyles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginVertical: 6,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
        marginRight: 10,
    },
    idText: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '600',
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    tag: {
        fontSize: 11,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 4,
        color: Colors.primary,
        backgroundColor: '#e3f2fd',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 8,
    },
    sourceText: {
        fontSize: 12,
        color: '#555',
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});