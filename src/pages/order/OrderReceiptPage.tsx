import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase';
import { IOrderWithDetails } from '@/types/dto/orderDTO';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const fetchOrderDetails = async (
  orderId: string
): Promise<IOrderWithDetails> => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      orderItem (
        *,
        product:products(*)
      )
    `
    )
    .eq('id', orderId)
    .single();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const OrderReceiptPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const navigate = useNavigate();
  const navigateToHome = () => navigate('/');
  const {
    data: orderDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId, //
  });
  useEffect(() => {
    console.log(orderDetails);
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!orderDetails) {
    return <p>주문 정보를 가져올 수 없습니다.</p>;
  }

  return (
    <div className="mt-6">
      <div className="text-center mb-10 pt-6">
        <p className="font-semibold">주문이 완료되었습니다.</p>
        <div className="text-xs mt-2">
          주문번호 <span className="text-pointColor">{orderDetails.id}</span>
        </div>
      </div>
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">주문상품정보</div>
        {orderDetails.orderItem.map((item) => (
          <div className="mt-6 mb-3 text-sm flex items-center" key={item.id}>
            <div className="mr-4">
              <img
                className="w-20 h-20"
                src={item.product?.image_url || 'images/default.png'}
                alt={item.product?.name}
              />
            </div>
            <div>
              <div className="mb-2 font-semibold">
                {item.product?.name || '[제품명 없음]'}
              </div>
              <div className="mb-2">
                {item.product?.weight || 'N/A'}g / {item.quantity}개
              </div>
              <div>{item.product?.price}원</div>
            </div>
          </div>
        ))}
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4">결제 정보</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">결제방법</div>
              <div className="w-[80%]">{orderDetails.payment_method}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문상태</div>
              <div className="w-[80%]">{orderDetails.status}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문접수일시</div>
              <div className="w-[80%]">{orderDetails.created_at}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">배송비</div>
              <div className="w-[80%]">3000원</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">결제금액</div>
              <div className="w-[80%]">{orderDetails.total_price}</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4">배송 정보</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">받으시는 분</div>
              <div className="w-[80%]">{orderDetails.shipping_recipient}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">휴대폰번호</div>
              <div className="w-[80%]">{orderDetails.shipping_phone}</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">주소</div>
              <div className="w-[80%]">{orderDetails.shipping_address}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <Button
          onClick={navigateToHome}
          className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
        >
          쇼핑 계속하기
        </Button>
      </div>
    </div>
  );
};
export default OrderReceiptPage;
