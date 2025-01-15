import { Button } from '@/components/ui/button';
import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { useInsertOrder, useInsertOrderItem } from '@/hooks/order/useOrder';
import useAuthStore from '@/stores/auth/useAuthStore';
import useCartStore from '@/stores/cart/useCartStore';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@/types/dto/orderDTO';
import { IProduct } from '@/types/dto/productDTO';
import { useNavigate } from 'react-router-dom';

const OrderDirectComponent = ({
  product,
  count,
}: {
  product: IProduct;
  count: number;
}) => {
  const { selectedItems, clearSelectedItems } = useCartStore();

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItem();
  const { mutate: deleteCart } = useCartDelete();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const totalPrice = product.price * count;
  const handleOrderBtn = async () => {
    if (!user?.id) {
      console.error('로그인 정보가 없습니다.');
      return;
    }

    // const cartId = selectedItems;
    const orderData = {
      user_id: user.id,
      total_price: totalPrice + 3000,
      status: OrderStatus.주문완료,
      payment_method: PaymentMethod.신용카드,
      payment_status: PaymentStatus.결제완료,
      shipping_recipient: user.id,
      shipping_address: 'g',
      shipping_phone: user.id,
      quantity: count,
    };
    insertOrder(orderData, {
      onSuccess: async (newOrder) => {
        console.log('주문 삽입 성공:', newOrder);

        console.log(newOrder);
        insertOrderItem(
          {
            productData: [
              {
                product_id: product.id,
                price: product.price,
                quantity: count,
              },
            ],
            orderId: newOrder.id,
          },
          {
            onSuccess: () => {
              console.log('주문 항목 삽입 성공');
              deleteCart({ cartIds: selectedItems, userId: user.id });
              clearSelectedItems();

              navigate('/order/receipt', {
                state: { isSuccess: true, orderId: newOrder.id },
              });
            },
            onError: (error) => {
              console.error('주문 항목 삽입 실패:', error);
            },
          }
        );
      },
      onError: (error) => {
        console.error('주문 삽입 실패:', error);
      },
    });
  };
  return (
    <div className="mt-6">
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">배송 정보</div>
        <div className="mt-6 mb-3 text-sm">
          <div className="font-semibold mb-2">{user?.name}</div>
          <div className="mb-2">
            ({user?.address.zonecode})&nbsp;{user?.address.roadAddress}&nbsp;
            {user?.address.detailAddress}
          </div>
          <div> {user?.phonenumber}</div>
          {/* <div>주문시 요청사항</div> */}
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">상품 정보</div>

        <div className="mt-6 mb-3 text-sm flex items-center">
          <div className="mr-4">
            <img className="w-20 h-20" src={product.image_url} />
          </div>
          <div>
            <div className="mb-2 font-semibold">[스타벅스] {product.name}</div>
            <div className="mb-2">
              {product.weight}g / {count}개{' '}
            </div>
            <div>{product.price}원</div>
          </div>
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">결제 방법</div>
        <div className="mt-6 mb-3 text-sm flex justify-between">
          <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            <img
              className="w-4 h-4 mr-2"
              src="/images/toss-logo.png"
              alt="Toss Logo"
            />
            토스페이
          </Button>

          <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            일반결제
          </Button>
        </div>
      </div>
      <div className="mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="flex justify-between  pb-4 border-b-2">
          <div className="font-semibold">결제 금액</div>
          <div className="font-bold text-pointColor">{totalPrice + 3000}원</div>
        </div>
        <div className="flex justify-between text-sm my-4">
          <div>
            <div className="mb-2">총 상품 금액</div>
            <div>배송비</div>
          </div>
          <div>
            <div className="mb-2 text-right">{totalPrice}원</div>
            <div>+3,000원</div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-semibold py-4 border-t-2 ">
          <div className="">총 결제 금액</div>
          <div>{totalPrice + 3000}원</div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <Button
          onClick={handleOrderBtn}
          className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
        >
          {totalPrice + 3000}원 구매하기
        </Button>
      </div>
    </div>
  );
};

export default OrderDirectComponent;
