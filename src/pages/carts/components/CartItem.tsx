import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';
import { ICartWithProduct } from '@/types/dto/cartDTO';
import { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';

const CartItemComponent = () => {
  // 사용자 인증 정보 가져오기
  const { user } = useAuthStore();
  const [item, setItem] = useState<ICartWithProduct[]>([]);

  // 장바구니와 상품 데이터를 가져오는 함수
  const fetchCartWithProducts = async (
    userId: string
  ): Promise<ICartWithProduct[]> => {
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
        product:products (id, name, weight)
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
    return data as ICartWithProduct[];
  };

  // 장바구니 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchCartData = async () => {
      if (!user?.id) return;

      try {
        const data = await fetchCartWithProducts(user.id);
        console.log('Fetched Cart Data:', data);
        setItem(data); // 상태 업데이트
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchCartData();
  }, [user?.id]);

  return (
    <>
      <div className="">
        <div className="px-4">
          <input type="checkbox" /> 전체 선택
        </div>
        {item?.map((cartItem: ICartWithProduct) => {
          if (!cartItem.product) return null; // product가 없는 경우 처리
          return (
            <div
              key={cartItem.id}
              className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black"
            >
              <div className="mr-3">
                <input type="checkbox" />
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div>[스타벅스] {cartItem.product.name}</div>
                  <BiX className="text-2xl text-gray-400 " />
                </div>
                <div>
                  {cartItem.product.weight}g / {cartItem.quantity}개
                </div>
                <div>
                  {Number(cartItem.price * cartItem.quantity).toLocaleString(
                    'ko-KR'
                  )}
                  원
                </div>
                <button>옵션 변경</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <button className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%]">
          99999원 구매하기
        </button>
      </div>
    </>
  );
};

export default CartItemComponent;
