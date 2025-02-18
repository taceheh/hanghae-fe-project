import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const [selectedCoffee, setSelectedCoffee] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedInterval, setSelectedInterval] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const basePrice = 16000;

  const weightPrices: Record<string, number> = {
    '200g': basePrice,
    '500g (+24,000)': basePrice + 24000,
    '1kg (+64,000)': basePrice + 64000,
  };

  // const durationMultipliers: Record<string, number> = {
  //   '3달': 3,
  //   '6달': 6,
  //   '12달': 12,
  // };

  // const intervalMultipliers: Record<string, number> = {
  //   '2주': 2,
  //   '4주': 1,
  // };

  const totalPrice = useMemo(() => {
    if (!selectedWeight || !selectedDuration || !selectedInterval) return 0;

    const weightPrice = weightPrices[selectedWeight] || 0;
    // const durationMultiplier = durationMultipliers[selectedDuration] || 1;
    // const intervalMultiplier = intervalMultipliers[selectedInterval] || 1;
    const duration = parseInt(selectedDuration || '0', 10);
    const interval = parseInt(selectedInterval || '0', 10);

    return weightPrice * duration * interval * quantity;
  }, [selectedWeight, selectedDuration, selectedInterval, quantity]);

  const handlePayment = () => {
    navigate('/subscription/order', {
      state: {
        coffee: selectedCoffee,
        weight: parseInt(selectedWeight || '0', 10),
        duration: parseInt(selectedDuration || '0', 10),
        interval: parseInt(selectedInterval || '0', 10),
        quantity,
        totalPrice,
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center text-lg font-bold">
        <img src="/images/coffee-bean-image.jpg" alt="Coffee Bean" />
      </div>

      <div className="border-b-[1px]">
        <div className="text-gray-700 font-semibold pb-4">상세 정보</div>
        <div className="text-sm pb-8">
          - 당일 로스팅된 신선한 원두를 발송합니다.
          <br />
          - 격주 배송을 선택하면 2주에 한 번 정해진 용량이 발송됩니다.
          <br />
          - 구독 신청은 로그인 후 이용 가능합니다.
          <br />
          - 구독은 정기 결제가 아니며, 선택한 개월 수만큼의 결제가 한 번에
          이루어집니다.
          <br />
        </div>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-2">원두 종류</div>
        <select
          value={selectedCoffee ?? ''}
          onChange={(e) => setSelectedCoffee(e.target.value)}
          className="border border-gray-300 rounded-none h-10 text-sm p-2 w-full"
        >
          <option value="" disabled>
            원두를 선택하세요
          </option>
          {[
            '코스타리카 따라주',
            '케냐 AA',
            '에티오피아 예가체프',
            '과테말라 안티구아',
            '인도네시아 만델링',
            '콜롬비아 수프리모',
          ].map((coffee) => (
            <option key={coffee} value={coffee}>
              {coffee}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-2">원두 무게</div>
        <select
          value={selectedWeight ?? ''}
          onChange={(e) => setSelectedWeight(e.target.value)}
          className="border border-gray-300 rounded-none h-10 text-sm p-2 w-full"
        >
          <option value="" disabled>
            무게를 선택하세요
          </option>
          {Object.keys(weightPrices).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-2">기간</div>
        <select
          value={selectedDuration ?? ''}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="border border-gray-300 rounded-none h-10 text-sm p-2 w-full"
        >
          <option value="" disabled>
            기간을 선택하세요
          </option>
          {[3, 6, 12].map((duration) => (
            <option key={duration} value={duration}>
              {duration}달
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-2">배송 간격</div>
        <select
          value={selectedInterval ?? ''}
          onChange={(e) => setSelectedInterval(e.target.value)}
          className="border border-gray-300 rounded-none h-10 text-sm p-2 w-full"
        >
          <option value="" disabled>
            배송 간격을 선택하세요
          </option>
          {[2, 4].map((interval) => (
            <option key={interval} value={interval}>
              {interval}주
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-2">수량</div>
        <input
          type="number"
          value={quantity}
          min={1}
          max={10}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 rounded-none p-2 w-full text-center"
        />
      </div>

      <button
        className="bg-black text-white rounded-lg px-6 py-3 text-xs w-full font-semibold disabled:bg-gray-400 hover:text-pointColor"
        onClick={handlePayment}
        disabled={
          !selectedCoffee ||
          !selectedWeight ||
          !selectedDuration ||
          !selectedInterval
        }
      >
        {totalPrice.toLocaleString()}원 구매하기
      </button>
    </div>
  );
};

export default SubscriptionPage;
