// interfaces/CarData.ts
interface ProductVariant {
    status: boolean;
    attributeValue: { attrId: string; attrType: string; label: string; value: string }[];
    priceNew: number;
    dealerStock: number;
}

export interface Product {
    id: string;
    name: string;
    version: string;
    basePrice: number;
    images: string[];
    rangeKm: number;
    batteryKWh: number;
    maxPowerHP: number;
    categories: string[];
    categoryIds: string[];
    variants: ProductVariant[];
    totalStock: number;
    status: string;
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