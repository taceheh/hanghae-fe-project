import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { useCartItems } from '@/hooks/cart/useCartItems';
import { useCartUpdate } from '@/hooks/cart/useCartUpdate';
import { BiX } from 'react-icons/bi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart/useCartStore';
import { calculateTotalAmount } from '@/utils/calculateTotalAmount';

const CartItemComponent = () => {
  const { selectedItems, setSelectedItems, clearSelectedItems } =
    useCartStore();
  const { data, isLoading, isError } = useCartItems();
  const { mutate: deleteCartItem } = useCartDelete();
  const { mutate: updateProductCount } = useCartUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while loading cart items.</div>;
  }

  const isAllSelected =
    selectedItems.length > 0 && selectedItems.length === data?.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelectedItems();
    } else {
      const cartIds = data?.map((item) => item.id) || [];
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
      await deleteCartItem({ cartId, userId });
      const newItems = selectedItems.filter((id) => id !== cartId);
      setSelectedItems(newItems);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <>
      <div className="">
        <div className="px-4">
          <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />{' '}
          전체 선택
        </div>
        {data?.map((cartItem) => {
          if (!cartItem.product) return null; // product가 없는 경우 처리
          return (
            <div
              key={cartItem.id}
              className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black"
            >
              <div className="mr-3">
                <Checkbox
                  checked={selectedItems.includes(cartItem.id)}
                  onCheckedChange={() => handleSelectItem(cartItem.id)}
                />
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
                      handleDeleteCart(cartItem.id, cartItem.user_id)
                    }
                    className="text-2xl text-gray-400 "
                  />
                </div>
                <div>
                  {cartItem.product.weight}g / {cartItem.quantity}개
                </div>
                <input
                  className="p-2"
                  type="number"
                  value={cartItem.quantity}
                  min={1}
                  max={10}
                  onChange={(e) =>
                    handleCountChange(cartItem.id, Number(e.target.value))
                  }
                />
                <div>
                  {(Number(cartItem.price) * cartItem.quantity).toLocaleString(
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
        <Button className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor">
          {calculateTotalAmount(data, selectedItems)}원 구매하기
        </Button>
      </div>
    </>
  );
};

export default CartItemComponent;
