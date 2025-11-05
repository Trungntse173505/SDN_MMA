import { useFetchProductDetail } from '@/hooks/useProductDetail';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Colors from '../../constants/Colors';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error, fetchProductDetail } = useFetchProductDetail();
  const { width } = useWindowDimensions();
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  useEffect(() => {
    if (id) fetchProductDetail(id);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Không tìm thấy xe hoặc lỗi tải dữ liệu.</Text>
      </View>
    );
  }

  const activeVariants = product.variants.filter(v => v.status);

  return (
    <ScrollView style={styles.container}>
      {/* === Ảnh Carousel === */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {product.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={[styles.carImage, { width }]} />
        ))}
      </ScrollView>

      {/* === Tiêu đề & giá === */}
      <View style={styles.titleArea}>
        <Text style={styles.carName}>{product.name} ({product.version})</Text>
        <Text style={styles.carPrice}>
          {(selectedVariant?.priceNew ?? product.basePrice).toLocaleString()} VNĐ
        </Text>
        <Text style={styles.statusText}>
          {product.status === 'active' ? 'Đang bán' : 'Ngừng kinh doanh'}
        </Text>
      </View>

      {/* === Danh mục === */}
      <Text style={styles.categoryText}>
        Danh mục: {product.categories.map(c => c.name).join(', ')}
      </Text>

      {/* === Nút hành động === */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="form" size={20} color="white" />
          <Text style={styles.actionText}>Tạo Báo giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <Feather name="refresh-ccw" size={20} color={Colors.primary} />
          <Text style={[styles.actionText, { color: Colors.primary }]}>Lái thử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compareIcon}>
          <Feather name="bar-chart-2" size={20} color={Colors.primary} />
          <Text style={{ fontSize: 12, color: Colors.primary }}>So sánh</Text>
        </TouchableOpacity>
      </View>

      {/* === Biến thể (màu sắc) === */}
      <Text style={styles.sectionTitle}>Tùy chọn màu sắc</Text>
      <View style={styles.variantContainer}>
        {activeVariants.map((variant, idx) => {
          const color = variant.attributeValue[0];
          const isSelected = selectedVariant?.attributeValue[0].value === color.value;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedVariant(variant)}
              style={[
                styles.variantBox,
                {
                  borderColor: isSelected ? Colors.primary : '#ccc',
                  backgroundColor: isSelected ? '#fef5e6' : 'white',
                },
              ]}
            >
              <Text style={{ fontWeight: '500' }}>{color.label}</Text>
              <Text style={{ color: '#E91E63' }}>{variant.priceNew.toLocaleString()} VNĐ</Text>
              <Text style={{ color: 'gray', fontSize: 12 }}>Kho: {variant.stock}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* === Thông số kỹ thuật === */}
      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      <View style={styles.specsContainer}>
        <View style={styles.specRow}><Text style={styles.specLabel}>Công suất</Text><Text style={styles.specValue}>{product.maxPowerHP} HP</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Pin</Text><Text style={styles.specValue}>{product.batteryKWh} kWh</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Phạm vi di chuyển</Text><Text style={styles.specValue}>{product.rangeKm} km</Text></View>
        <View style={styles.specRow}><Text style={styles.specLabel}>Tồn kho</Text><Text style={styles.specValue}>{product.totalStock}</Text></View>
      </View>

      {/* === Mô tả chi tiết (Text thường) === */}
      {product.content && (
        <>
          <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            <Text style={{ fontSize: 14, color: '#333', lineHeight: 20 }}>
              {product.content.replace(/<[^>]+>/g, '') /* loại bỏ thẻ HTML */}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  carImage: { height: 250, resizeMode: 'cover' },
  titleArea: { paddingHorizontal: 16, paddingVertical: 10 },
  carName: { fontSize: 24, fontWeight: 'bold' },
  carPrice: { fontSize: 20, color: '#E91E63', fontWeight: '600', marginTop: 4 },
  statusText: { color: 'green', fontSize: 14, marginTop: 4 },

  categoryText: { fontSize: 14, color: 'gray', marginHorizontal: 16, marginBottom: 8 },

  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  compareIcon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  actionText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10, marginBottom: 8 },

  specsContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  specLabel: { fontSize: 14, color: 'gray' },
  specValue: { fontSize: 14, fontWeight: '500' },

  variantContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginBottom: 10 },
  variantBox: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: '1.5%',
  },
});
