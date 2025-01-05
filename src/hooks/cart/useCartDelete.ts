import { deleteCartItem } from '@/api/cart';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useCartDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartId, userId }: { cartId: string; userId: string }) =>
      deleteCartItem(cartId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartList'] });
      console.log('선택 상품이 장바구니에서 삭제되었습니다.');
    },
    onError: (err) => {
      console.log('선택 상품 삭제 중 에러 발생:', err);
    },
  });
};
