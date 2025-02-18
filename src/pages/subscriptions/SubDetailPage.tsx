import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { ISubWithDetails } from '@/types/dto/subscriptionDTO';

const fetchSubDetails = async (orderId: string): Promise<ISubWithDetails> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(
      `
      *,
      subscription_items (*)
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
const SubDetailPage = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams<{ id: string }>();
  const navigateToHome = () => navigate('/');
  const {
    data: subDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['subDetails', orderId],
    queryFn: () => fetchSubDetails(orderId!),
    enabled: !!orderId, //
  });
  useEffect(() => {
    console.log(subDetails);
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!subDetails) {
    return <p>주문 정보를 가져올 수 없습니다.</p>;
  }

  return (
    <div className="mt-6">
      <div className="text-center mb-10 pt-6">
        <div className="text-xs mt-2">
          주문번호 <span className="text-pointColor">{subDetails.id}</span>
        </div>
      </div>
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">주문상품정보</div>
        <div
          className="mt-6 mb-3 text-sm flex items-center"
          key={subDetails.subscription_items[0].bean_type}
        >
          <div className="mr-4">
            <img
              className="w-20 h-20"
              src={'images/default.png'}
              alt="원두이미지"
            />
          </div>
          <div>
            <div className="mb-2 font-semibold">
              {subDetails.subscription_items[0].bean_type}
            </div>
            <div className="mb-2">
              {subDetails.subscription_items[0].bean_weight}g /{' '}
              {subDetails.quantity}개
            </div>
            <div>{subDetails.total_price}원</div>
          </div>
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4">결제 정보</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">결제방법</div>
              <div className="w-[80%]">{subDetails.payment_method}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문상태</div>
              <div className="w-[80%]">{subDetails.status}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문접수일시</div>
              <div className="w-[80%]">{subDetails.created_at}</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">결제금액</div>
              <div className="w-[80%]">{subDetails.total_price}</div>
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
              <div className="w-[80%]">{subDetails.shipping_recipient}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">휴대폰번호</div>
              <div className="w-[80%]">{subDetails.shipping_phone}</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">주소</div>
              <div className="w-[80%]">{subDetails.shipping_address}</div>
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
export default SubDetailPage;
