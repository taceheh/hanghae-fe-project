import supabase from '@/supabase';
import { ICartWithProduct } from '@/types/dto/cartDTO';
import { IProduct } from '@/types/dto/productDTO';

export const upsertCartData = async (
  userId: string,
  product: IProduct,
  count: number
): Promise<void> => {
  const { data } = await supabase
    .from('cart')
    .select()
    .eq('user_id', userId)
    .eq('product_id', product?.id)
    .single();

  if (data) {
    const newQuantity = count + data.quantity;
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity: newQuantity })
      .eq('product_id', product?.id)
      .eq('user_id', userId);
    if (updateError) {
      console.error('장바구니 업데이트 중 에러 발생:', updateError.message);
    } else {
      console.log('장바구니가 업데이트되었습니다.');
    }
  } else {
    const cartData = {
      user_id: userId,
      product_id: product?.id,
      quantity: count,
      price: product?.price,
    };
    const { error: insertError } = await supabase.from('cart').insert(cartData);

    if (insertError) {
      console.error('장바구니 추가 중 에러 발생:', insertError.message);
    } else {
      console.log('장바구니가 추가되었습니다.');
    }
  }
};

// 장바구니와 상품 데이터를 가져오는 함수
export const fetchCartWithProducts = async (
  userId: string
): Promise<ICartWithProduct[]> => {
  if (!userId) {
    throw new Error('유효하지 않은 사용자 ID입니다.');
  }
  const { data, error } = await supabase
    .from('cart')
    .select(
      `
        id,
        user_id,
        product_id,
        quantity,
        price,
        created_at,
        product:products (id, name, weight,image_url)
      `
    )
    .eq('user_id', userId);

  if (error) {
    throw new Error(
      `장바구니와 상품 데이터를 가져오는 중 에러 발생: ${error.message}`
    );
  }

  console.log('Raw Data from Supabase:', data);

  // 데이터 변환 없이 반환
  return data;
};

export const deleteCartData = () => {};
