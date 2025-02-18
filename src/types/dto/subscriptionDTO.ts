import { OrderStatus } from './orderDTO';

export interface ISubscription {
  id: string;
  user_id: string;
  paymentKey: string;
  status: OrderStatus;
  payment_method: string;
  shipping_recipient: string;
  shipping_address: string;
  shipping_phone: string;
  quantity: number;
  total_price: number;
  created_at: string;
  payment_status: '결제대기' | '결제완료' | '결제취소';
}

export interface ISubscriptionItem {
  id: string;
  subscription_id: string;
  bean_type: string;
  bean_weight: OrderStatus;
  duration: string;
  delivery_interval: string;
  start_date: string;
  end_date: string;
  quantity: number;
  created_at: string;
}
export type SubsInsert = Omit<ISubscription, 'created_at'>;
export interface DeliveryInfoType {
  subscription_id: string;
  bean_type: string;
  bean_weight: number;
  duration: number;
  delivery_interval: number;
  start_date: string;
  end_date: string;
  quantity: number;
}

export interface ISubWithDetails extends ISubscription {
  subscription_items: ISubscriptionItem[]; // 주문 항목 배열
}
