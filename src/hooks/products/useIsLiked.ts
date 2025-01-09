import { fetchIsLiked } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

export const useIsLiked = (productId: string, userId: string) => {
  return useQuery<boolean, Error>({
    queryKey: ['isLiked', productId, userId],
    queryFn: () => fetchIsLiked(productId, userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
