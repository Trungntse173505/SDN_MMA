import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router'; 
import Colors from '../constants/Colors'; 

// Khai báo Interface cho dữ liệu Khách hàng
interface CustomerData {
    id: string;
    name: string;
    phone: string;
    status: 'Tiềm năng' | 'Đã mua' | 'Cũ';
    carOfInterest?: string;
}

interface CustomerCardProps {
    customer: CustomerData;
    onAppointmentPress: (id: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onAppointmentPress }) => {
    
    // Đường dẫn tới trang chi tiết khách hàng
    const linkProps = {
        pathname: "/customers/[id]", 
        params: { id: customer.id } 
    };

    return (
        <Link 
            href={linkProps as any} 
            asChild
        >
            <TouchableOpacity style={styles.card}>
                <View style={styles.info}>
                    <Text style={styles.name}>{customer.name}</Text>
                    <Text style={styles.phone}>{customer.phone}</Text>
                    <Text style={styles.status}>Trạng thái: {customer.status}</Text>
                    {customer.carOfInterest && (
                        <Text style={styles.carInterest}>Quan tâm: {customer.carOfInterest}</Text>
                    )}
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity 
                        onPress={() => onAppointmentPress(customer.id)} 
                        style={styles.actionButton}
                    >
                        <Feather name="calendar" size={18} color={Colors.primary} />
                        <Text style={styles.actionText}>Hẹn</Text>
                    </TouchableOpacity>
                    <AntDesign name="right" size={16} color="gray" />
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 6,
        borderLeftWidth: 5,
        borderLeftColor: Colors.secondary,
        elevation: 1,
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    phone: { fontSize: 14, color: '#555' },
    status: { fontSize: 12, color: 'darkgreen', marginTop: 4 },
    carInterest: { fontSize: 12, color: 'gray', fontStyle: 'italic' },
    actions: { flexDirection: 'row', alignItems: 'center' },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: Colors.background,
    },
    actionText: {
        marginLeft: 4,
        fontSize: 12,
        color: Colors.primary,
        fontWeight: 'bold',
    }
});

export default CustomerCard;