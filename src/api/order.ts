// api/order.ts
import supabase from '@/supabase';
import { IOrder, OrderInsert } from '@/types/dto/orderDTO';
import { orderDetailProps } from '@/types/dto/orderItemDTO';

export const insertOrder = async (orderData: OrderInsert): Promise<IOrder> => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

export const insertOrderItem = async (
  productData: orderDetailProps[],
  orderId: string
): Promise<void> => {
  console.log(productData);
  console.log(orderId);
  const { error } = await supabase.from('orderItem').insert(
    productData.map((item) => ({
      order_id: orderId,
      price: item.price,
      quantity: item.quantity,
    }))
  );
  if (error) throw new Error(error.message);
};

export const getCartDetails = async (
  cartIds: string[]
): Promise<orderDetailProps[]> => {
  const { data, error } = await supabase
    .from('cart')
    .select('product_id, price, quantity')
    .in('id', cartIds);
  if (error) throw new Error(error.message);
  return data;
};
