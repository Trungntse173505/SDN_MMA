import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { CarData } from '../interfaces/CarData';

interface CarCardProps {
  car: CarData;
  style?: object;
  showCompareButton?: boolean;
}

const formatPrice = (price?: number) => {
  if (!price) return 'Liên hệ';
  return price.toLocaleString('vi-VN');
};

const CarCard: React.FC<CarCardProps> = ({ car, style, showCompareButton = false }) => {
  const defaultImage = 'https://via.placeholder.com/280x150?text=EV+Image';
  const detailPath = `/car/${car.id}`;
  const isAvailable = (car.totalStock || 0) > 0;
  const priceInVND = formatPrice(car.price);

  return (
      <View style={[styles.shadowWrapper, style]}> 
        {/* TouchableOpacity BÊN TRONG: Áp dụng BorderRadius và Overflow: 'hidden' */}
        <View style={styles.card}>
          {/* Ảnh */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: car.imageUrl || defaultImage }}
              style={styles.image}
              resizeMode="cover"
            />
            {isAvailable && (
              <View style={styles.statusTag}>
                <Feather name="check-circle" size={12} color="#fff" />
                <Text style={styles.statusText}>Sẵn hàng</Text>
              </View>
            )}
          </View>

          {/* Thông tin */}
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {car.name}
            </Text>

            <View style={styles.specsRow}>
              <View style={styles.specItem}>
                <Feather name="battery" size={14} color="#777" />
                <Text style={styles.specText}>{car.rangeKm || 'N/A'} Km</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.specItem}>
                <Feather name="zap" size={14} color="#777" />
                <Text style={styles.specText}>{car.maxPowerHP || 'N/A'} HP</Text>
              </View>
            </View>
          </View>

          {/* Giá */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{priceInVND}</Text>
            <Text style={styles.priceUnit}>VNĐ</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  // STYLE MỚI: Dành riêng cho Shadow (Đảm bảo độ nổi bật)
  shadowWrapper: { 
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.5, // CỰC KỲ ĐẬM để không bị mờ
    shadowRadius: 15,
    elevation: 15, // MAX Elevation cho Android
    borderRadius: 16,
  },
  // STYLE ĐÃ TÁCH: Chỉ giữ lại hình dạng và overflow
  card: { 
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden', 
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 165,
    backgroundColor: '#f5f6f8',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#ececec',
    paddingTop: 8,
    marginTop: 4,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  specText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 5,
    fontWeight: '500',
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  priceContainer: {
    position: 'absolute',
    top: 115,
    right: 0,
    backgroundColor: '#0E2A47',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  priceUnit: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default CarCard;