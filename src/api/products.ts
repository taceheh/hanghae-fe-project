import supabase from '@/supabase';
import { ProductResponse } from '@/types/dto/productDTO';

// 상품 리스트 가져오기
export const fetchProduct = async (page: number): Promise<ProductResponse> => {
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const { data, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .range(start, end);

  if (error) {
    console.error('Error fetching products:', error.message);
    return { data: [], totalCount: 0, page };
  }
  return {
    data: data || [],
    totalCount: count || 0,
    page,
  };
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

// 좋아요 등록
export const insertLike = async (userId: string, productId: string) => {
  const { error } = await supabase.from('likes').insert({
    user_id: userId,
    product_id: productId,
  });
  if (error) console.log('좋아요 등록 에러 : ', error);
};

// 좋아요 취소
export const deleteLike = async (userId: string, productId: string) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
  if (error) console.log('좋아요 등록 취소 에러 : ', error);
};
