import { fetchProduct } from '@/api/products';
import { IProduct } from '@/types/dto/productDTO';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: fetchProduct,
    staleTime: 1000 * 60 * 5,
  });
};
