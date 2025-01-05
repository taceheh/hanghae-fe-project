import supabase from '@/supabase';
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

export const deleteCartData = () => {};
