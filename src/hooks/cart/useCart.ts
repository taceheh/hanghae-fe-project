import { upsertCartData } from '@/api/cart';
import { IProduct } from '@/types/dto/productDTO';
import { useMutation } from '@tanstack/react-query';

export const useCart = () => {
  const mutation = useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({
      userId,
      product,
      count,
    }: {
      userId: string;
      product: IProduct;
      count: number;
    }) => {
      return upsertCartData(userId, product, count); // **Promise 반환**
    },
    onSuccess: () => {
      console.log('장바구니에 추가되었습니다.');
    },
    onError: (err) => {
      console.error('장바구니 추가 중 에러 발생:', err);
    },
  });

  return mutation;
};
