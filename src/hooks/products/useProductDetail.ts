import { fetchProductData } from '@/api/products';
import { IProduct } from '@/types/dto/productDTO';
import { useQuery } from '@tanstack/react-query';

export const useProductDetail = (productId: string) => {
  return useQuery<IProduct, Error, IProduct, [string, string]>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductData(productId),
    staleTime: 1000 * 60 * 5,
  });
};
