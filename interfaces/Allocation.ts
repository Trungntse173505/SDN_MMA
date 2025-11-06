// interfaces/Allocation.ts
export interface AllocationVariant {
  index: number;
  hash: string;
  attributeValue: {
    attrId?: string;
    attrType?: string;
    label?: string;
    value?: string;
  }[];
  price: number;
  sku: string;
}

export interface AllocationProductLite {
  id: string;
  name: string;
  version: string;
  images: string[]; // dùng phần tử [0] làm thumbnail
}

export type AllocationStatus = "pending" | "shipped" | "delivered" | "canceled";

export interface Allocation {
  id: string;
  product: AllocationProductLite;
  variant: AllocationVariant;
  quantity: number; // số lượng phân bổ
  allocatedQuantity: number; // đã phân bổ
  vinCount: number; // số VIN
  status: AllocationStatus;
  notes: string;
  allocatedAt?: string; // ISO
  shippedAt?: string; // ISO
  deliveredAt?: string; // ISO
  createdAt: string; // ISO
}

export interface AllocationPagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}
