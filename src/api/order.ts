import supabase from '@/supabase';
import { IOrder, OrderInsert } from '../types/dto/orderDTO.ts';
import { IOrderItem } from '../types/dto/orderItemDTO.ts';
import useCartStore from '@/stores/cart/useCartStore.ts';
import { useEffect } from 'react';

export const insertOrder = async (orderData: OrderInsert): Promise<void> => {
  const { selectedItems } = useCartStore();
  useEffect(() => {
    console.log(selectedItems);
  }, []);
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select(); // insert 후 select 호출

  if (error) {
    console.log('주문처리 실패:', error);
    return;
  }

  if (data && data.length > 0) {
    // 주문이 잘 들어갔으면
    // orderItem에 데이터 넣어야하고
    // 해당되는 cartId 지워야하고
    // zustand selectedItems 비워야하고
    // 주문완료 페이지로 가야함

    const insertedOrder = data[0]; // 삽입된 첫 번째 주문 데이터
    console.log('삽입된 데이터:', insertedOrder);

    const order_id = insertedOrder.id; // 새로 생성된 주문 ID 사용
  }
};
export const insertOrderItem = async (itemData: IOrderItem): Promise<void> => {
  const { error } = await supabase.from('or').insert(itemData);
  if (error) console.log('주문처리 실패:', error);
};
