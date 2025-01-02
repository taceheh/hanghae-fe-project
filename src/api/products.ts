import supabase from '@/supabase';
import { IProduct } from '@/types/dto/productDTO';

// 상품 리스트 가져오기
export const fetchProduct = async (): Promise<IProduct[]> => {
  const { data } = await supabase.from('products').select();
  return data || [];
};
