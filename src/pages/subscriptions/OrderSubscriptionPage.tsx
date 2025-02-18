import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/auth/useAuthStore';
import { addressFormat } from '@/utils/addressFromat';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Postcode } from '@/pages/mypage/components/PostCode';
import { SubscriptionPayment } from './components/SubscriptionPayment';
const OrderSubscriptionPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionData = location.state;
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데

  const [recipient, setRecipient] = useState(user?.name || '');
  const [phoneNum, setPhoneNum] = useState(user?.phonenumber || '');
  const [postcode, setPostcode] = useState(user?.address?.zonecode || '');
  const [roadAddress, setRoadAddress] = useState(
    user?.address?.roadAddress || ''
  );
  const [detailAddress, setDetailAddress] = useState(
    user?.address?.detailAddress || ''
  );

  const [isFormValid, setIsFormValid] = useState(false);

  // 🚀 **입력값이 모두 채워졌는지 확인**
  useEffect(() => {
    setIsFormValid(
      !!recipient &&
        !!phoneNum &&
        !!postcode &&
        !!roadAddress &&
        !!detailAddress
    );
  }, [recipient, phoneNum, postcode, roadAddress, detailAddress]);
  const deliveryInfo = {
    coffee: subscriptionData.coffee,
    weight: subscriptionData.weight,
    duration: subscriptionData.duration,
    interval: subscriptionData.interval,
    quantity: subscriptionData.quantity,
    recipient: recipient,
    address: addressFormat({
      zonecode: postcode,
      roadAddress: roadAddress,
      detailAddress: detailAddress,
    }),
    phoneNum: phoneNum,
  };

  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
  }) => {
    setPostcode(data.postcode); // 우편번호 저장
    setRoadAddress(data.address); // 주소 저장
  };

  return (
    <div className="mt-6">
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">배송 정보</div>
        <div className="mt-6 mb-3 text-sm">
          <div className=" mb-4 flex">
            <div className="font-semibold mr-2">
              수령인 <span className="text-pointColor">*</span>
            </div>
            <input
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
              className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
            />
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mr-2">
              배송지 <span className="text-pointColor">*</span>
            </div>
            <div className="">
              <div>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="우편번호"
                  className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
                />
                <Postcode onComplete={handleAddressComplete} />
              </div>
              <input
                type="text"
                value={roadAddress}
                onChange={(e) => setRoadAddress(e.target.value)}
                placeholder="주소"
                className="w-full p-2 border-gray-300 border-[1px] mb-2"
              />
              <input
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세주소"
                className="w-full p-2 border-gray-300 border-[1px]"
              />
            </div>
          </div>
          <div className="font-semibold mb-2 flex">
            <div className="mr-2">
              연락처 <span className="text-pointColor">*</span>
            </div>
            <input
              onChange={(e) => setPhoneNum(e.target.value)}
              value={phoneNum}
              className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
            />
          </div>
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">상품 정보</div>

        <div className="mt-6 mb-3 text-sm flex items-center">
          <div className="mr-4">
            <img className="w-20 h-20" alt="이미지" />
          </div>
          <div>
            <div className="mb-2 font-semibold">{subscriptionData.coffee}</div>
            <div className="mb-2">
              {subscriptionData.weight} / {subscriptionData.quantity}개{' '}
            </div>
            <div className="mb-2">
              {subscriptionData.interval} 간격 / {subscriptionData.duration}
            </div>
            <div>{subscriptionData.totalPrice}원</div>
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

          {/* <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            일반결제
          </Button> */}
        </div>
      </div>
      <div className="mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="flex justify-between  pb-4 border-b-2">
          <div className="font-semibold">결제 금액</div>
          <div className="font-bold text-pointColor">
            {subscriptionData.totalPrice}원
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <SubscriptionPayment
          isFormValid={isFormValid}
          totalPrice={subscriptionData.totalPrice}
          deliveryInfo={deliveryInfo}
        />
      </div>
    </div>
  );
};

export default OrderSubscriptionPage;
