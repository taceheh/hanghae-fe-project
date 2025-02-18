import { fetchReviewAverage } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

export const useGetReviewAverage = (productId: string) => {
  return useQuery({
    queryKey: ['reviewAverage', productId],
    queryFn: () => fetchReviewAverage(productId),
    enabled: !!productId, // productId가 존재할 때만 실행
  });
};
