import supabase from '@/supabase';
import { IOrder, OrderInsert } from '../types/dto/orderDTO.ts';

export const insertOrder = async (
  orderData: OrderInsert,
  cartId: string[]
): Promise<void> => {
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
    const insertedOrder = data[0]; // 삽입된 첫 번째 주문 데이터
    console.log('삽입된 데이터:', insertedOrder);

    const order_id = insertedOrder.id; // 새로 생성된 주문 ID 사용
    await insertOrderItem(cartId, order_id); // 주문 항목 삽입
  }
};

export const insertOrderItem = async (
  cartId: string[],
  orderId: string
): Promise<void> => {
  // cartId를 기준으로 상품 정보 가져오기
  const productData = await getCartDetails(cartId);

  const { error } = await supabase.from('orderItem').insert(
    productData.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      price: item.price,
      quantity: item.quantity,
    }))
  );

  if (error) {
    console.log('주문 항목 삽입 실패:', error);
  } else {
    console.log('주문 항목이 성공적으로 삽입되었습니다.');
  }
};

// cartId를 기준으로 해당하는 상품 정보 가져오는 쿼리
export const getCartDetails = async (
  cartIds: string[]
): Promise<orderDetailProps[]> => {
  const { data, error } = await supabase
    .from('cart')
    .select('product_id, price, quantity')
    .in('id', cartIds); // cartId에 해당하는 항목들 가져오기

  if (error) {
    console.log('장바구니 정보 가져오기 에러:', error);
    return []; // 에러가 있으면 빈 배열 반환
  } else {
    return data; // 쿼리 결과 반환
  }
};

interface orderDetailProps {
  product_id: string;
  price: number;
  quantity: number;
}
