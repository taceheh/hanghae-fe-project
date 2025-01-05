import { updateProductCount } from '@/api/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCartUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartId, count }: { cartId: string; count: number }) =>
      updateProductCount(cartId, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartList'] });
      console.log('선택 상품 수량 업데이트 성공');
    },
    onError: (err) => {
      console.log('선택 상품 수량 업데이트 중 에러 발생 : ', err);
    },
  });
};
