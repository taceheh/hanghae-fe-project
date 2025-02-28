import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { useCartItems } from '@/hooks/cart/useCartItems';
import { useCartUpdate } from '@/hooks/cart/useCartUpdate';
import { BiX } from 'react-icons/bi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart/useCartStore';
import { calculateTotalAmount } from '@/utils/cartUtil';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/auth/useAuthStore';

const CartItemComponent = () => {
  const { selectedItems, setSelectedItems, clearSelectedItems } =
    useCartStore();
  const { data: cartItems, isError } = useCartItems();
  const { mutate: deleteCartItem } = useCartDelete();
  const { mutate: updateProductCount } = useCartUpdate();
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isError) {
    return <div>Error occurred while loading cart items.</div>;
  }

  const isAllSelected =
    selectedItems.length > 0 && selectedItems.length === cartItems?.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelectedItems();
    } else {
      const cartIds = cartItems?.map((item) => item.id) || [];
      setSelectedItems(cartIds);
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 상품 개수 갱신 함수
  const handleCountChange = (id: string, quantity: number) => {
    updateProductCount({ cartId: id, count: quantity });
  };

  const handleDeleteCart = async (cartId: string, userId: string) => {
    try {
      deleteCartItem({ cartIds: [cartId], userId });
      const newItems = selectedItems.filter((id) => id !== cartId);
      setSelectedItems(newItems);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };
  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToOrder = () => {
    if (selectedItems.length !== 0) navigate('/order');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      {isLogin ? (
        <>
          {!cartItems || cartItems.length === 0 ? (
            <div className="text-center m-20">
              <div className="font-semibold mb-2">
                장바구니에 담긴 상품이 없어요
              </div>
              <div className="text-gray-400 font-semibold text-xs mb-8">
                원하는 상품을 담아보세요
              </div>
              <Button
                onClick={navigateToHome}
                className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
              >
                상품 보러 가기
              </Button>
            </div>
          ) : (
            <>
              <div className="">
                <div className="px-4">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />{' '}
                  전체 선택
                </div>
                {cartItems?.map((item) => {
                  if (!item.product) return null; // product가 없는 경우 처리
                  return (
                    <div
                      key={item.id}
                      className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black"
                    >
                      <div className="mr-3">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                      </div>
                      <div className="h-[110px] mr-3">
                        <img
                          className="h-[110px] w-[110px]"
                          src={item.product.image_url}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between w-full">
                          <div>[스타벅스] {item.product.name}</div>
                          <BiX
                            onClick={() =>
                              handleDeleteCart(item.id, item.user_id)
                            }
                            className="text-2xl text-gray-400 "
                          />
                        </div>
                        <div>
                          {item.product.weight}g / {item.quantity}개
                        </div>
                        <input
                          className="p-2"
                          type="number"
                          value={item.quantity}
                          min={1}
                          max={10}
                          onChange={(e) =>
                            handleCountChange(item.id, Number(e.target.value))
                          }
                        />
                        <div>
                          {(Number(item.price) * item.quantity).toLocaleString(
                            'ko-KR'
                          )}
                          원
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 flex justify-center align-middle bg-gray-100">
                <Button
                  disabled={selectedItems.length === 0}
                  onClick={navigateToOrder}
                  className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
                >
                  {calculateTotalAmount(cartItems, selectedItems)}원 구매하기
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center m-20">
          <div className="font-semibold mb-2">
            로그인 후 이용가능한 기능입니다.
          </div>

          <Button
            onClick={navigateToLogin}
            className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
          >
            로그인하러 가기
          </Button>
        </div>
      )}
    </>
  );
};

export default CartItemComponent;
