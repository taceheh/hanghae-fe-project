import { fetchProduct } from '@/api/products';
// import { ProductResponse } from '@/types/dto/productDTO';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => fetchProduct(pageParam),
    getNextPageParam: (last) => {
      //last에 담겨있는 것은?
      if (last.data.length === 0) {
        return undefined;
      }
      const nextPage = last.page + 1;
      const totalDataCount = last.page * 10;
      if (totalDataCount < last.totalCount) {
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};
