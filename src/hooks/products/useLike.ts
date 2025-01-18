import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLike } from '@/api/products';

export const useLike = (userId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      productId,
      isLiked,
      userId,
    }: {
      productId: string;
      isLiked: boolean;
      userId: string;
    }) => {
      await updateLike(isLiked, productId, userId);
      return { productId, isLiked }; // 반환값 추가
    },
    onSuccess: ({
      productId,
      isLiked,
    }: {
      productId: string;
      isLiked: boolean;
    }) => {
      queryClient.setQueryData(['products'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((product: any) =>
              product.id === productId
                ? {
                    ...product,
                    isLiked: !isLiked,
                    likeCount: product.likeCount + (isLiked ? -1 : 1),
                  }
                : product
            ),
          })),
        };
      });
      queryClient.setQueryData(['product', productId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          isLiked: !isLiked,
          likeCount: oldData.likeCount + (isLiked ? -1 : 1),
        };
      });

      // 3. 좋아요 상태 쿼리 업데이트
      queryClient.setQueryData(['isLiked', productId, userId], !isLiked);
    },
  });

  return mutation;
};
