import { useState } from 'react';
import { fetchSecureGet } from './utils/apiClient';

interface ProductDetail {
  id: string;
  name: string;
  version: string;
  slug: string;
  images: string[];
  basePrice: number;
  rangeKm: number;
  batteryKWh: number;
  maxPowerHP: number;
  totalStock: number;
  content?: string;
  variants: any[];
  categories: { id: string; name: string }[];
  status: string;
}

interface HookResult {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  fetchProductDetail: (id: string) => Promise<void>;
}

export const useFetchProductDetail = (): HookResult => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetail = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSecureGet(`/products/${id}`);
      setProduct(res.product);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi tải chi tiết sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, fetchProductDetail };
};
