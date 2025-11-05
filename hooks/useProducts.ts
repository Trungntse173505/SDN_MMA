import { useCallback, useEffect, useState } from 'react';
import { fetchSecureGet } from './utils/apiClient';

// Định nghĩa Interface sản phẩm dựa trên phản hồi API (Rút gọn)
interface Product {
  id: string;
  name: string;
  version: string;
  basePrice: number;
  images: string[];
  totalStock: number;
  // ...
}

interface ProductFetchParams {
  keyword?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}

interface ProductHookResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: { totalRecords: number, totalPages: number };
  fetchProducts: (params?: ProductFetchParams) => void;
}


export const useFetchProducts = (initialParams: ProductFetchParams = {}): ProductHookResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ totalRecords: 0, totalPages: 0 });

  const fetchProducts = useCallback(async (params: ProductFetchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const allParams = { ...initialParams, ...params, page: params.page || 1, limit: params.limit || 20 };
      
      // ✅ GỌI API BẢO MẬT: Dùng fetchSecureGet và endpoint '/product'
      const result = await fetchSecureGet('/product', allParams);
      
      setProducts(result.products);
      setPagination(result.pagination);

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message); 
      } else {
        setError("Lỗi không xác định khi tải sản phẩm.");
      }
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // Lần đầu tải dữ liệu khi component được mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, pagination, fetchProducts };
};