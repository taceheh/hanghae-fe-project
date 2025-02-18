import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';
import { formatISOToDate } from '@/utils/dateFormat';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ISubWithDetails } from '@/types/dto/subscriptionDTO';
import { SubCancelModal } from './components/SubCancelModal';
const fetchSubDetails = async (userId: string): Promise<ISubWithDetails[]> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(
      `
      *,
        subscription_items (*)
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const SubscriptionHistoryPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (!user) {
    console.log('사용자가 없습니다.');
    return;
  }
  const { data: subHistories } = useQuery({
    queryKey: ['subHistory', user?.id],
    queryFn: () => fetchSubDetails(user.id),
    enabled: !!user?.id, //
  });
  // console.log(orderHistories);
  const navigateToSub = () => {
    navigate('/subscription');
  };
  const navigateToDetail = (subId: string) => {
    navigate(`/subscription/detail/${subId}`);
  };
  return (
    <>
      {subHistories?.length === 0 ? (
        <div className="text-center m-20">
          <div className="font-semibold mb-2">주문내역이 없어요</div>
          <div className="text-gray-400 font-semibold text-xs mb-8">
            원하는 상품을 둘러보세요
          </div>
          <Button
            onClick={navigateToSub}
            className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
          >
            상품 보러 가기
          </Button>
        </div>
      ) : (
        <div className="mx-4 mt-8">
          {subHistories?.map((sub) => (
            <div key={sub.id} className="">
              <div className="my-2 flex justify-between items-end">
                {formatISOToDate(sub.created_at)}{' '}
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => navigateToDetail(sub.id)}
                >
                  주문상세 {'>'}
                </div>
              </div>
              <div className="pt-4 pb-8 border-t-[0.2rem] border-black">
                {sub.subscription_items.map((item) => (
                  <>
                    <div
                      key={item.id}
                      className="flex justify-between mb-2 text-sm  "
                    >
                      <div>
                        <div className="font-semibold mb-2">
                          {sub.status} · {formatISOToDate(item.start_date)} ~{' '}
                          {formatISOToDate(item.end_date)}
                        </div>
                        <div className="mb-2">{item.bean_type}</div>

                        <div className="mb-2">
                          {item.bean_weight}g / {item.quantity} 개
                        </div>
                        <div className="mb-2">{sub.total_price}원</div>
                        {sub.status === '주문취소' ? (
                          <></>
                        ) : (
                          <SubCancelModal
                            orderId={sub.id}
                            paymentKey={sub.paymentKey}
                          />
                        )}
                      </div>
                      <div>
                        <img className="w-20 h-20" alt="원두이미지" />
                      </div>
                    </div>
                    <div className="border-b-[1px] border-black flex justify-center pb-2 ">
                      <div className="text-center text-pointColor font-semibold text-xs bg-orange-100 py-1 w-[96%]">
                        {item.duration}달 / {item.delivery_interval} 주에 한 번
                        정기배송
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SubscriptionHistoryPage;
