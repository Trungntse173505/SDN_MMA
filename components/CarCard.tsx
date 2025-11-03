import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { CarData } from '../interfaces/CarData'; // Import Interface

interface CarCardProps {
    car: CarData;
    style?: object;
    showCompareButton?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, style, showCompareButton = false }) => {
  const defaultImage = 'https://via.placeholder.com/250x150?text=Car+Image';
  const detailPath = `/car/${car.id}`; 

  return (
    <Link href={detailPath} asChild>
        <TouchableOpacity style={[styles.card, style]}>
            <Image 
                source={{ uri: car.imageUrl || defaultImage }} 
                style={styles.image} 
            />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{car.name}</Text>
                <Text style={styles.price}>{car.price.toLocaleString()} Triệu VNĐ</Text>
                
                {showCompareButton && (
                    <TouchableOpacity style={styles.compareButton}>
                        <Text style={styles.compareText}>+ So sánh</Text>
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
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 8,
        elevation: 2,
    },
    image: { width: '100%', height: 150 },
    info: { padding: 10 },
    name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    price: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },
    compareButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    compareText: { color: 'white', fontSize: 12 }
});

export default CarCard;