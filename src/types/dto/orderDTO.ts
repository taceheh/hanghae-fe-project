// Order Table 타입
import { IOrderItem } from './orderItemDTO';
import { IProduct } from './productDTO';
export interface IOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: '주문대기' | '주문완료' | '주문취소';
  // status: string;
  // payment_method: '신용카드' | '간편결제';
  payment_method: string;
  payment_status: '결제대기' | '결제완료' | '결제취소';
  // payment_method: string;
  shipping_recipient: string;
  shipping_address: string;
  shipping_phone: string;
  created_at: string;
  quantity: number;
  // payment_status: string;
}
export type OrderInsert = Omit<IOrder, 'created_at'>;

export enum OrderStatus {
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
export interface IOrderItemWithProduct extends IOrderItem {
  product?: IProduct; // Optional: 상품 정보가 있을 경우만 포함
}

// IOrder를 확장하여 orderItem 데이터를 포함
export interface IOrderWithDetails extends IOrder {
  orderItem: IOrderItemWithProduct[]; // 주문 항목 배열
}
