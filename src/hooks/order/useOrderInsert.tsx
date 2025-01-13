import { insertOrder } from '@/api/order';
import { OrderInsert } from '@/types/dto/orderDTO';
import { useMutation } from '@tanstack/react-query';

export const useOrderInsert = () => {
  const mutate = useMutation({
    mutationKey: ['order'],
    mutationFn: async ({
      orderData,
      cartId,
    }: {
      orderData: OrderInsert;
      cartId: string[];
    }) => {
      return insertOrder(orderData, cartId);
    },
    onSuccess: () => {
      console.log('주문이 완료되었습니다.');
    },
    onError: (err) => {
      console.log('주문이 실패했습니다.', err);
    },
  });
  return mutate;
};
