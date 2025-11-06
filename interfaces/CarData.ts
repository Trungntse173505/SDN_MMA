// interfaces/CarData.ts
export interface ProductAttributeValue {
  attrId: string;
  attrType: string;
  label: string;
  value: string; // ví dụ: "red", "white"
}

export interface ProductVariant {
  status: boolean; // variant đang active hay không
  attributeValue: ProductAttributeValue[];
  priceOld: number; // có trong JSON
  priceNew: number;
  stock: number;
  dealerStock: number;
}

export interface Product {
  id: string;
  name: string;
  version: string;
  slug?: string;
  basePrice: number;
  images: string[];
  rangeKm: number;
  batteryKWh: number;
  maxPowerHP: number;
  categories: string[]; // ["Xe điện"]
  categoryIds: string[];
  variants: ProductVariant[];
  totalStock: number;
  status: string; // "active"
}

export interface CarData {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  maxPowerHP?: number;
  rangeKm?: number;
  totalStock?: number;
}
