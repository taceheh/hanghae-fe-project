import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { useCartItems } from '@/hooks/cart/useCartItems';
import supabase from '@/supabase';
import { ICartWithProduct } from '@/types/dto/cartDTO';
import { useState } from 'react';
import { BiX } from 'react-icons/bi';

const CartItemComponent = () => {
  // 사용자 인증 정보 가져오기
  // const { user } = useAuthStore();
  // const [item, setItem] = useState<ICartWithProduct[]>([]);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});
  const { data, isLoading, isError } = useCartItems();
  const { mutate: deleteCartItem } = useCartDelete();

  if (isLoading) <div>Loading...</div>;
  if (isError) <div>Error</div>;
  console.log(data);

  // 상품 개수 갱신 함수
  const handleCountChange = (id: string, quantity: string) => {
    const updatedQuantity = Number(quantity);
    setItemCounts((prev) => ({
      ...prev,
      [id]: updatedQuantity,
    }));
    updateProductCount(id, updatedQuantity);
  };
  // 상품 수량 변경 함수
  const updateProductCount = async (cart_id: string, count: number) => {
    const { data } = await supabase
      .from('cart')
      .update({ quantity: count })
      .eq('id', cart_id);

    if (data) {
      console.log('수정되었습니다.');
      return;
    }
  };

  return (
    <>
      <div className="">
        <div className="px-4">
          <input type="checkbox" /> 전체 선택
        </div>
        {data?.map((cartItem: ICartWithProduct) => {
          if (!cartItem.product) return null; // product가 없는 경우 처리
          return (
            <div
              key={cartItem.id}
              className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black"
            >
              <div className="mr-3">
                <input type="checkbox" />
              </div>
              <div className="h-[110px] mr-3">
                <img
                  className="h-[110px] w-[110px]"
                  src={cartItem.product.image_url}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div>[스타벅스] {cartItem.product.name}</div>
                  <BiX
                    onClick={() =>
                      deleteCartItem({
                        cartId: cartItem.id,
                        userId: cartItem.user_id,
                      })
                    }
                    className="text-2xl text-gray-400 "
                  />
                </div>
                <div>
                  {cartItem.product.weight}g /{' '}
                  {itemCounts[cartItem.id] ?? cartItem.quantity}개
                </div>
                <input
                  className="p-2"
                  type="number"
                  value={itemCounts[cartItem.id] ?? cartItem.quantity}
                  min={1}
                  max={10}
                  onChange={(e) =>
                    handleCountChange(cartItem.id, e.target.value)
                  }
                />
                <div>
                  {(
                    Number(cartItem.price) *
                    (itemCounts[cartItem.id] ?? cartItem.quantity)
                  ).toLocaleString('ko-KR')}
                  원
                </div>
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
