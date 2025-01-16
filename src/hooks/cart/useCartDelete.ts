import { deleteCartItem } from '@/api/cart';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useCartDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartIds, userId }: { cartIds: string[]; userId: string }) =>
      deleteCartItem(cartIds, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartList'] });
      console.log('선택 상품이 장바구니에서 삭제성공');
    },
    onError: (err) => {
      console.log('선택 상품 삭제 중 에러 발생:', err);
    },
  });
};
