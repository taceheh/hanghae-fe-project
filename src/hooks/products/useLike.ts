// import { toggleLikeAPI } from '@/api/products';
// import { likeType } from '@/types/dto/likeDTO';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLike } from '@/api/products';
export const useLike = (
  isLiked: boolean,
  productId: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error>({
    mutationKey: ['toggleLike', productId, userId],
    mutationFn: async () => await updateLike(isLiked, productId, userId),
    onSuccess: () => {
      queryClient.setQueryData(['isLiked', productId, userId], !isLiked);
      console.log('좋아요 업데이트 성공');
    },
  });
  return mutation;
};
