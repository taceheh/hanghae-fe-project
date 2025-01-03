import supabase from '@/supabase';
import { IProduct } from '@/types/dto/productDTO';

// 상품 리스트 가져오기
export const fetchProduct = async (): Promise<IProduct[]> => {
  const { data, error } = await supabase.from('products').select();
  if (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
  return data || [];
};

// 상품 데이터 가져오기
export const fetchProductData = async (productId: string) => {
  if (!productId) throw new Error('상품 ID가 유효하지 않습니다.');
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('id', productId)
    .single();
  if (error) {
    console.log('Error fetching product detail : ', error.message);
  }
  return data;
};
