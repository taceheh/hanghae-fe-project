import { fetchProductReviews } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

export const useGetReviews = (productId: string) => {
  return useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => fetchProductReviews(productId),
  });
};
