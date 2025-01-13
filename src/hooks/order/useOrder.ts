// hooks/order/useOrder.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { insertOrder, insertOrderItem, getCartDetails } from '@/api/order';
import { OrderInsert } from '@/types/dto/orderDTO';
import { orderDetailProps } from '@/types/dto/orderItemDTO';

export const useInsertOrder = () => {
  return useMutation({
    mutationFn: (orderData: OrderInsert) => insertOrder(orderData),
  });
};

export const useInsertOrderItem = () => {
  return useMutation({
    mutationFn: ({
      productData,
      orderId,
    }: {
      productData: orderDetailProps[];
      orderId: string;
    }) => insertOrderItem(productData, orderId),
  });
};

export const useCartDetails = (cartIds: string[]) => {
  return useQuery({
    queryKey: ['cartDetails', cartIds],
    queryFn: () => getCartDetails(cartIds),
    enabled: cartIds.length > 0, // cartIds가 있을 때만 실행
  });
};
