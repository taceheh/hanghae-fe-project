import { fetchProduct } from '@/api/products';
// import { ProductResponse } from '@/types/dto/productDTO';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProducts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => fetchProduct(pageParam, userId),
    getNextPageParam: (last, allPages) => {
      if (last.data.length === 0) return undefined; // 더 이상 가져올 데이터 없음
      if (allPages.length === 1) return last.page + 1; // 🔥 초기에 자동으로 2번째 요청 방지
      if (last.page * 10 >= last.totalCount) return undefined; // 모든 데이터 가져왔으면 종료
      return last.page + 1;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};
