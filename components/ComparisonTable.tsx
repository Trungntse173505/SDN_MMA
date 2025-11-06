import { Product } from "@/interfaces/CarData";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

interface ComparisonTableProps {
  cars: (Product & { selectedVariant?: any })[];
}

export default function ComparisonTable({ cars }: ComparisonTableProps) {
  const [variantMap, setVariantMap] = useState<Record<string, any>>({});

  // 🧠 Khởi tạo variant mặc định
  useEffect(() => {
    if (!cars.length) return;
    const initial: Record<string, any> = {};
    cars.forEach(car => {
      const firstAvailable =
        car.selectedVariant ||
        car.variants.find(v => v.status && (v.stock > 0 || v.dealerStock > 0)) ||
        car.variants[0];
      initial[car.id] = firstAvailable;
    });
    setVariantMap(initial);
  }, [cars]);

  // ❌ Không có xe
  if (!cars.length)
    return (
      <Text style={{ textAlign: "center", marginTop: 30, color: "#888" }}>
        Hãy chọn ít nhất 1 xe để so sánh
      </Text>
    );

  // 🔁 Đổi màu (variant)
  const handleChangeVariant = (carId: string, variant: any) => {
    setVariantMap(prev => ({ ...prev, [carId]: variant }));
  };

  // Helper lấy variant hiện tại
  const getVariant = (car: Product) =>
    variantMap[car.id] ||
    car.variants.find(v => v.status && (v.stock > 0 || v.dealerStock > 0)) ||
    car.variants[0];

  const rows = [
    { label: "Tên xe", render: (car: Product) => `${car.name} (${car.version})` },
    {
      label: "Màu sắc",
      render: (car: Product) => {
        const variant = getVariant(car);
        const color = variant?.attributeValue?.[0];
        if (!variant || !color) return <Text>—</Text>;

        return (
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: color?.value || "#ccc",
                width: 26,
                height: 26,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: "#aaa",
                marginBottom: 4,
              }}
            />
            <Text style={{ fontWeight: "500" }}>{color?.label}</Text>

            {/* Dải chọn màu (lọc các màu còn hàng) */}
            <View style={{ flexDirection: "row", marginTop: 6 }}>
              {car.variants
                .filter(v => v.stock > 0 || v.dealerStock > 0) // ✅ chỉ hiển thị màu còn hàng
                .map((v, idx) => {
                  const col = v.attributeValue?.[0];
                  if (!col) return null;
                  const isActive = v === variant;
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleChangeVariant(car.id, v)}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        backgroundColor: col.value,
                        marginHorizontal: 3,
                        borderWidth: isActive ? 2 : 1,
                        borderColor: isActive ? Colors.primary : "#ccc",
                      }}
                    />
                  );
                })}
            </View>
          </View>
        );
      },
    },
    {
      label: "Giá bán (VNĐ)",
      render: (car: Product) => {
        const v = getVariant(car);
        return v?.priceNew ? v.priceNew.toLocaleString() : "—";
      },
    },
    { label: "Công suất (HP)", render: (car: Product) => car.maxPowerHP },
    { label: "Pin (kWh)", render: (car: Product) => car.batteryKWh },
    { label: "Phạm vi di chuyển (km)", render: (car: Product) => car.rangeKm },
    { label: "Tồn kho", render: (car: Product) => getVariant(car)?.stock ?? "—" },
  ];

  return (
    <ScrollView horizontal style={styles.tableWrapper}>
      <View>
        {/* Header */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.headerCell]}>Thuộc tính</Text>
          {cars.map(car => (
            <Text key={car.id} style={[styles.cell, styles.headerCell]}>
              {car.name}
            </Text>
          ))}
        </View>

        {/* Các dòng dữ liệu */}
        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.cell, styles.labelCell]}>{row.label}</Text>
            {cars.map(car => (
              <View key={car.id} style={[styles.cell, styles.valueCell]}>
                {typeof row.render(car) === "string" ||
                typeof row.render(car) === "number" ? (
                  <Text>{row.render(car)}</Text>
                ) : (
                  row.render(car)
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableWrapper: { marginTop: 10 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  cell: { flex: 1, padding: 10, minWidth: 160, textAlign: "center" },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: Colors.primary,
    color: "white",
  },
  labelCell: {
    fontWeight: "600",
    backgroundColor: "#f9f9f9",
    textAlign: "left",
  },
  valueCell: { justifyContent: "center", alignItems: "center" },
});
