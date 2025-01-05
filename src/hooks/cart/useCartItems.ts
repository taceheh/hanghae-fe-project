import { fetchCartWithProducts } from '@/api/cart';
import useAuthStore from '@/stores/auth/useAuthStore';
import { ICartWithProduct } from '@/types/dto/cartDTO';
import { useQuery } from '@tanstack/react-query';

export const useCartItems = () => {
  const { user } = useAuthStore();
  const userId = user?.id;
  //   if (!user) console.log('empty user info');
  return useQuery<ICartWithProduct[]>({
    queryKey: ['cartList', userId],
    queryFn: () => fetchCartWithProducts(userId!),
    refetchOnWindowFocus: true, // 창 포커스 시 다시 가져오기
  });
};
