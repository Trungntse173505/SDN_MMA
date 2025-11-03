// interfaces/CarData.ts (Tạo file mới)

export interface CarData {
    id: string;
    name: string;
    price: number; // Triệu VNĐ
    imageUrl?: string;
    status?: 'Còn hàng' | 'Hết hàng';
    
    // Index signature cho phép truy cập thuộc tính bằng key động (cần cho ComparisonTable)
    [key: string]: string | number | boolean | undefined; 

    // Các thông số chi tiết (cho trang Detail và Compare)
    power?: string;
    battery?: string;
    range?: string;
    seatingCapacity?: number;
}