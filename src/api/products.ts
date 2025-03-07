import supabase from '@/supabase';
import { ProductResponse } from '@/types/dto/productDTO';

// 상품 리스트 가져오기
export const fetchProduct = async (
  page: number,
  userId: string
): Promise<ProductResponse> => {
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const { data, count, error } = await supabase
    .from('products')
    .select('*, likes(user_id, product_id), reviews(user_id)', {
      count: 'exact',
    })
    .range(start, end);
  console.log(data);

  if (error) {
    console.error('Error fetching products:', error.message);
    return { data: [], totalCount: 0, page };
  }

  const processedData = (data || []).map((product) => {
    const likes = product.likes || [];
    const reviews = product.reviews || [];

    return {
      ...product,
      isLiked: likes.some(
        (like: { user_id: string }) => like.user_id === userId
      ),
      likeCount: likes.length,
      reviewCount: reviews.length, // 리뷰 개수
    };
  });
  return {
    data: processedData || [],
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

export const fetchIsLiked = async (
  productId: string,
  userId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116은 데이터가 없을 때의 에러 코드
    throw new Error('좋아요 상태 확인 실패');
  }

  return !!data; // 데이터가 있으면 true, 없으면 false
};

export const toggleLikeAPI = async (
  userId: string,
  productId: string,
  action: 'LIKE' | 'UNLIKE'
): Promise<void> => {
  try {
    if (action === 'LIKE') {
      const { error } = await supabase.from('likes').insert({
        user_id: userId,
        product_id: productId,
      });
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      if (error) throw error;
    }
    // return true; // 성공 시 true 반환
  } catch (error) {
    console.error('Supabase Error:', error);
    // return false; // 실패 시 false 반환
  }
};

export const updateLike = async (
  isLiked: boolean,
  productId: string,
  userId: string
) => {
  if (isLiked) {
    await supabase
      .from('likes')
      .delete()
      .eq('product_id', productId)
      .eq('user_id', userId);
  } else {
    await supabase
      .from('likes')
      .insert({ product_id: productId, user_id: userId });
  }
};

// 상품 리뷰 데이터 가져오기
export const fetchProductReviews = async (productId: string) => {
  if (!productId) throw new Error('상품 ID가 유효하지 않습니다.');

  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      id,
      user_id,
      comment,
      created_at,
      rating,
      users (name)
    `
    )
    .eq('product_id', productId);

  if (error) {
    console.error('리뷰 데이터를 가져오는 중 에러 발생:', error.message);
    throw new Error(error.message);
  }

  return data;
};

export const fetchReviewAverage = async (productId: string) => {
  if (!productId) throw new Error('상품 ID가 유효하지 않습니다.');

  const { data, error } = await supabase.rpc('get_average_rating', {
    p_product_id: productId,
  });
  if (error) {
    console.error('리뷰 데이터를 가져오는 중 에러 발생:', error.message);
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const checkUserReview = async ({
  productId,
  userId,
  orderId,
}: {
  productId: string;
  userId: string;
  orderId: string;
}) => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('order_id', orderId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
};
