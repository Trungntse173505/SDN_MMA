import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors'; 

interface AppointmentData {
    id: string;
    customerName: string;
    carModel: string;
    dateTime: string; 
    status: 'Sắp tới' | 'Hoàn thành' | 'Hủy';
}

interface AppointmentItemProps {
    appointment: AppointmentData;
    onDetailPress: (id: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onDetailPress }) => {
    
    const statusColor = appointment.status === 'Sắp tới' ? Colors.primary : 
                        appointment.status === 'Hoàn thành' ? 'green' : 'red';

    return (
        <TouchableOpacity style={styles.item} onPress={() => onDetailPress(appointment.id)}>
            <Feather name="clock" size={24} color={statusColor} style={styles.icon} />
            <View style={styles.info}>
                <Text style={styles.customerName}>{appointment.customerName} - {appointment.carModel}</Text>
                <Text style={styles.dateTime}>{appointment.dateTime}</Text>
            </View>
            <View style={styles.statusBadge}>
                <Text style={[styles.statusText, {color: statusColor}]}>{appointment.status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    icon: { marginRight: 15 },
    info: { flex: 1 },
    customerName: { fontSize: 16, fontWeight: '600' },
    dateTime: { fontSize: 13, color: 'gray', marginTop: 3 },
    statusBadge: { 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 5, 
        backgroundColor: Colors.background 
    },
    statusText: { fontSize: 12, fontWeight: 'bold' }
});

export default AppointmentItem;