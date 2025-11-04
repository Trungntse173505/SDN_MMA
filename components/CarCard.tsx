import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Colors from '../constants/Colors'; 
// Import AntDesign nếu bạn cần dùng nó trong CarCard
import { AntDesign } from '@expo/vector-icons'; 

// Giả định CarData Interface
interface CarData { 
    id: string; 
    name: string; 
    price: number; 
    imageUrl?: string; 
    // Các props khác... 
}

interface CarCardProps {
    car: CarData;
    style?: object;
    showCompareButton?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, style, showCompareButton = false }) => {
  const defaultImage = 'https://via.placeholder.com/280x150?text=EV+Image';
  const detailPath = `/car/${car.id}`;

  return (
    <Link href={detailPath as any} asChild>
        <TouchableOpacity style={[styles.card, style]}>
            {/* Vùng chứa ảnh: Dùng resizeMode="contain" để ảnh không bị méo */}
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: car.imageUrl || defaultImage }} 
                    style={styles.image} 
                    resizeMode="contain" // ✅ FIX LỖI: Giữ nguyên tỉ lệ ảnh
                />
            </View>
            
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{car.name}</Text>
                <Text style={styles.price}>{car.price.toLocaleString()} Triệu VNĐ</Text>
                
                {showCompareButton && (
                    <TouchableOpacity style={styles.compareButton}>
                        <AntDesign name="swap" size={12} color="white" /> 
                        <Text style={styles.compareText}> So sánh</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 8,
        elevation: 4, // Tăng shadow để Card nổi bật
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    imageContainer: {
        width: '100%',
        height: 150, // Giữ chiều cao cố định
        backgroundColor: '#f5f5f5', // Màu nền nhẹ để ảnh contain nổi bật
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, // Thêm padding nhẹ xung quanh ảnh
    },
    image: { 
        width: '100%', 
        height: '100%', // Kích thước ảnh bằng vùng chứa
    },
    info: { 
        padding: 10,
        position: 'relative'
    },
    name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    price: { fontSize: 14, color: '#27ae60', fontWeight: '600' },
    compareButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    compareText: { color: 'white', fontSize: 12, marginLeft: 3 }
});

export default CarCard;