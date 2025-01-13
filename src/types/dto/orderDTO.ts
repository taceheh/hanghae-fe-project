// Order Table 타입
export interface IOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: '주문대기' | '주문완료' | '주문취소';
  // status: string;
  payment_method: '신용카드' | '간편결제';
  payment_status: '결제대기' | '결제완료' | '결제취소';
  // payment_method: string;
  shipping_recipient: string;
  shipping_address: string;
  shipping_phone: string;
  created_at: string;
  quantity: number;
  // payment_status: string;
}
export type OrderInsert = Omit<IOrder, 'id' | 'created_at'>;

export enum OrderStatus {
  주문대기 = '주문대기',
  주문완료 = '주문완료',
  주문취소 = '주문취소',
}

export enum PaymentStatus {
  결제대기 = '결제대기',
  결제완료 = '결제완료',
  결제취소 = '결제취소',
}
export enum PaymentMethod {
  신용카드 = '신용카드',
  간편결제 = '간편결제',
}
