// OrderItem Table 타입
export interface IOrderItem {
  id: string; // UUID
  order_id: string; // UUID
  product_id: string; // UUID
  price: number; // 상품 가격 (소수점 포함 가능)
  quantity: number; // 상품 수량
  created_at: string; // ISO 8601 형식의 날짜 문자열
}
