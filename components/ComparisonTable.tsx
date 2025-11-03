import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CarData } from '../interfaces/CarData'; // Import Interface

interface ComparisonTableProps {
    cars: CarData[];
}

const SPEC_ROWS = [
    { key: 'price', label: 'Giá bán (Triệu VNĐ)', isMonetary: true },
    { key: 'power', label: 'Công suất tối đa', isMonetary: false },
    { key: 'battery', label: 'Dung lượng Pin', isMonetary: false },
    { key: 'range', label: 'Phạm vi di chuyển', isMonetary: false },
    { key: 'seatingCapacity', label: 'Số chỗ ngồi', isMonetary: false },
];

const ComparisonTable: React.FC<ComparisonTableProps> = ({ cars }) => {
    if (!cars || cars.length === 0) {
        return <Text style={styles.emptyText}>Vui lòng thêm xe để so sánh.</Text>;
    }

    return (
        <ScrollView horizontal style={styles.tableContainer}>
            <View style={styles.table}>

                {/* Hàng Tiêu đề (Thông số) */}
                <View style={styles.headerRow}>
                    <Text style={[styles.cell, styles.specHeader, styles.fixedColumn]}>THÔNG SỐ</Text>
                    {cars.map(car => (
                        <Text key={car.id} style={[styles.cell, styles.carHeader]}>{car.name}</Text>
                    ))}
                </View>

                {/* Các Hàng Dữ liệu */}
                {SPEC_ROWS.map(spec => (
                    <View key={spec.key} style={styles.dataRow}>
                        <Text style={[styles.cell, styles.specLabel, styles.fixedColumn]}>{spec.label}</Text>

                        {cars.map(car => {
                            // Truy cập thuộc tính an toàn bằng index signature
                            const carValue = car[spec.key];
                            let displayValue = String(carValue || 'N/A');

                            if (spec.isMonetary && typeof carValue === 'number') {
                                displayValue = `${carValue.toLocaleString()} M`;
                            }

                            return (
                                <Text key={`${car.id}-${spec.key}`} style={styles.cell}>
                                    {displayValue}
                                </Text>
                            );
                        })}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

// ... (Styles đã được định nghĩa ở câu trả lời trước, giữ nguyên)
const styles = StyleSheet.create({
    tableContainer: { marginVertical: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ddd', shadowOpacity: 0.1, elevation: 3 },
    table: { flexDirection: 'column' },
    cell: { width: 150, padding: 10, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#f0f0f0', minHeight: 40, justifyContent: 'center', alignItems: 'center', fontSize: 13 },
    headerRow: { flexDirection: 'row', backgroundColor: '#333' },
    dataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    specHeader: { backgroundColor: '#333', color: 'white', fontWeight: 'bold', textAlign: 'left' },
    carHeader: { backgroundColor: '#444', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 14 },
    specLabel: { backgroundColor: '#f7f7f7', fontWeight: '500', textAlign: 'left' },
    fixedColumn: { width: 180, borderRightWidth: 2, borderRightColor: '#ccc', textAlign: 'left', paddingLeft: 15 },
    emptyText: { textAlign: 'center', padding: 30, fontSize: 16, color: 'gray' }
});

export default ComparisonTable;