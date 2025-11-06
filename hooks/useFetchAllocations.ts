import { useEffect, useState } from "react";
import { fetchSecureGet } from "./utils/apiClient";

interface AllocatedProduct {
  id: string;
  name: string;
  version: string;
  images: string[];
}

export interface Allocation {
  id: string;
  product: AllocatedProduct;
  quantity: number;
  allocatedQuantity: number;
  vinCount: number;
  status: string;
  allocatedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  notes?: string;
}

export const useFetchAllocations = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const result = await fetchSecureGet("/allocations", { limit: 9999 });

      // ✅ API trả về ở dạng { allocations: [...], pagination: {...} }
      if (result?.allocations) {
        setAllocations(result.allocations);
      } else if (result?.data?.allocations) {
        // fallback nếu backend thay đổi cấu trúc
        setAllocations(result.data.allocations);
      } else {
        console.warn("⚠️ Dữ liệu trả về không có mảng allocations:", result);
        setAllocations([]);
      }
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách phân bổ:", err);
      setError(err instanceof Error ? err.message : "Không thể tải danh sách phân bổ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  return { allocations, loading, error, fetchAllocations };
};
