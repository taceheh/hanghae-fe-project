import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { useCartItems } from '@/hooks/cart/useCartItems';
import { useCartUpdate } from '@/hooks/cart/useCartUpdate';
import { ICartWithProduct } from '@/types/dto/cartDTO';
import { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const CartItemComponent = () => {
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const { data, isLoading, isError } = useCartItems();
  const { mutate: deleteCartItem } = useCartDelete();
  const { mutate: updateProductCount } = useCartUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while loading cart items.</div>;
  }

  // 상품 개수 갱신 함수
  const handleCountChange = (id: string, quantity: string) => {
    const updatedQuantity = Number(quantity);

    setItemCounts((prev) => {
      const previousQuantity =
        prev[id] ??
        data?.find((item: ICartWithProduct) => item.id === id)?.quantity ??
        1;
      const itemPrice = Number(
        data?.find((item: ICartWithProduct) => item.id === id)?.price ?? 0
      );

      // 기존 금액과 새로운 금액의 차이를 totalAmount에 반영
      setTotalAmount(
        (prevTotal) =>
          prevTotal + (updatedQuantity - previousQuantity) * itemPrice
      );

      return {
        ...prev,
        [id]: updatedQuantity,
      };
    });

    // 서버와 동기화
    updateProductCount({ cartId: id, count: updatedQuantity });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      // 전체 선택 해제 시
      setSelectedItems([]);
      setTotalAmount(0); // 총 금액 초기화
    } else {
      // 전체 선택 시
      const cartIdArr = data?.map((item: ICartWithProduct) => item.id) || [];
      const total = data?.reduce(
        (sum: number, item: ICartWithProduct) =>
          sum + Number(item.price) * (itemCounts[item.id] ?? item.quantity),
        0
      );

      setSelectedItems(cartIdArr);
      setTotalAmount(total); // 총 금액 업데이트
    }
    setAllSelected(!allSelected);
  };

  const handleSelectItem = (id: string, amount: number) => {
    if (selectedItems.includes(id)) {
      setTotalAmount(() => totalAmount - amount);
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setTotalAmount(() => totalAmount + amount);
      setSelectedItems([...selectedItems, id]);
    }
  };
  useEffect(() => {
    const allIds = data?.map((item: ICartWithProduct) => item.id) || [];
    setAllSelected(
      allIds.length > 0 &&
        allIds.every((id: string) => selectedItems.includes(id))
    );
  }, [selectedItems, data]);
  return (
    <>
      <div className="">
        <div className="px-4">
          <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />{' '}
          전체 선택
        </div>
        {data?.map((cartItem: ICartWithProduct) => {
          if (!cartItem.product) return null; // product가 없는 경우 처리
          return (
            <div
              key={cartItem.id}
              className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black"
            >
              <div className="mr-3">
                <Checkbox
                  checked={selectedItems.includes(cartItem.id)}
                  onCheckedChange={() =>
                    handleSelectItem(
                      cartItem.id,
                      Number(cartItem.price) *
                        (itemCounts[cartItem.id] ?? cartItem.quantity)
                    )
                  }
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
        <Button className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor">
          {totalAmount}원 구매하기
        </Button>
      </div>
    </>
  );
};

export default CartItemComponent;
