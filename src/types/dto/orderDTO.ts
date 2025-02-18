// Order Table 타입
import { IOrderItem } from './orderItemDTO';
import { IProduct } from './productDTO';
export interface IOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: OrderStatus;
  payment_method: string;
  payment_status: '결제대기' | '결제완료' | '결제취소';
  shipping_recipient: string;
  shipping_address: string;
  shipping_phone: string;
  created_at: string;
  quantity: number;
  paymentKey: string;
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

export interface IReview {
  id: string;
  user_id: string;
  product_id: string;
  comment: string;
  created_at: string;
  rating: number;
  order_item_id: string;
}

export interface IOrderItemWithProduct extends IOrderItem {
  product?: IProduct; // Optional: 상품 정보가 있을 경우만 포함
  reviews?: IReview[];
}

export interface IOrderWithDetails extends IOrder {
  orderItem: IOrderItemWithProduct[]; // 주문 항목 배열
}
