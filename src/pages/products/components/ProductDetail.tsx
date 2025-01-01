import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';
import { IProduct } from '@/types/dto/productDTO';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiHeart, BiSolidCommentDetail, BiSolidHeart } from 'react-icons/bi';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const { user } = useAuthStore();

  const [product, setProduct] = useState<IProduct | null>(null);

  // 상품 데이터 가져오기
  const fetchProductData = async () => {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('id', productId)
      .single();
    if (data) {
      setProduct(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  // 상품 개수 상태
  const [count, setCount] = useState(1);

  // 상품 개수 갱신 함수
  const handleCountChange = (quantity: string) => {
    setCount(Number(quantity));
  };

  // 장바구니 추가 로직
  const addCartBtn = async () => {
    if (!user?.id || !product?.id) {
      console.error('유효한 사용자 또는 상품 정보가 없습니다.');
      return;
    }

    const cartData = {
      user_id: user?.id,
      product_id: product?.id,
      quantity: count,
      price: product?.price,
    };

    const { data } = await supabase
      .from('cart')
      .select()
      .eq('user_id', user?.id)
      .eq('product_id', product?.id)
      .single();

    if (data) {
      const newQuantity = count + data.quantity;
      const { error: updateError } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('product_id', product?.id)
        .eq('user_id', user?.id);
      if (updateError) {
        console.error('장바구니 업데이트 중 에러 발생:', updateError.message);
      } else {
        console.log('장바구니가 업데이트되었습니다.');
      }
    } else {
      const { error: insertError } = await supabase
        .from('cart')
        .insert(cartData);

      if (insertError) {
        console.error('장바구니 추가 중 에러 발생:', insertError.message);
      } else {
        console.log('장바구니가 추가되었습니다.');
      }
    }
  };

  return (
    <>
      <div className="">
        <img
          // className="border border-emerald-50 w-[50%] g-50%]"
          className="w-full"
          alt="원두이미지"
          src={product?.image_url}
        />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs ">
              <span className="mr-1 py-1 px-2 font-bold rounded bg-clipColor2 ">
                {product?.origin}
              </span>
              <span className="py-1 px-2 bg-clipColor1 font-bold">
                {product?.flavor}
              </span>
            </div>
            <BiHeart className=" text-2xl text-gray-400 z-50 cursor-pointer" />
          </div>
          <div className="py-4"> {product?.name}</div>
          <div className="line-through text-sm text-gray-400">
            {product?.price}원
          </div>
          <div className="text-sm font-semibold text-pointColor">
            원두 구독시 최대 할인 가격
          </div>
          <div className=" font-medium text-2xl">
            <span className=" text-pointColor">20%</span> &nbsp;
            {Math.floor(((Number(product?.price) ?? 0) * 0.8) / 100) * 100}
            <span className="text-sm font-semibold">원</span>
          </div>
        </div>
      </div>
      <div className="p-4 justify-between flex">
        <input
          type="number"
          value={count}
          min={1}
          max={10}
          onChange={(e) => {
            handleCountChange(e.target.value);
          }}
        />
        <button
          className="w-[240px] p-2 text-xs border border-solid text-customBlack font-bold border-gray-200 rounded-none"
          onClick={addCartBtn}
        >
          장바구니 담기
        </button>
        <button className="w-[240px] border text-xs border-solid bg-customBlack rounded-none text-white font-bold">
          바로 구매하기
        </button>
      </div>
      <div>
        원산지 맛설명 상품설명
        <div>{product?.description}</div>
      </div>
      <div className="p-4">리뷰요</div>
    </>
  );
};

export default ProductDetailPage;
