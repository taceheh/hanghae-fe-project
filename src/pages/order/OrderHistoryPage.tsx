import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase';
import { IOrderWithDetails } from '@/types/dto/orderDTO';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/auth/useAuthStore';
import { formatISOToDate } from '@/utils/dateFormat';
import { ReviewModal } from './components/ReviewModal';
import { useNavigate } from 'react-router-dom';
import { OrderCancelModal } from './components/OrderCancelModal';
const fetchOrderDetails = async (
  userId: string
): Promise<IOrderWithDetails[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
    *,
    orderItem (
      *,
      product:products(*),
      reviews (*)
    )
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

const OrderHistoryPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (!user) {
    console.log('사용자가 없습니다.');
    return;
  }
  const { data: orderHistories } = useQuery({
    queryKey: ['orderHistory', user?.id],
    queryFn: () => fetchOrderDetails(user.id),
    enabled: !!user?.id, //
  });
  // console.log(orderHistories);
  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <>
      {orderHistories?.length === 0 ? (
        <div className="text-center m-20">
          <div className="font-semibold mb-2">주문내역이 없어요</div>
          <div className="text-gray-400 font-semibold text-xs mb-8">
            원하는 상품을 둘러보세요
          </div>
          <Button
            onClick={navigateToHome}
            className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
          >
            상품 보러 가기
          </Button>
        </div>
      ) : (
        <div className="mx-4 mt-8">
          {orderHistories?.map((order) => (
            <div key={order.id}>
              <div className="my-2 flex justify-between items-end">
                {formatISOToDate(order.created_at)}{' '}
                <OrderCancelModal
                  orderId={order.id}
                  paymentKey={order.paymentKey}
                />
              </div>
              <div className="py-4 border-t-[0.2rem] border-black">
                {order.orderItem.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mt-3 mb-3 pb-4 text-sm  border-b-[1px] border-black"
                  >
                    <div>
                      <div className="font-semibold mb-2">
                        {order.status} · {formatISOToDate(item.created_at)}
                      </div>
                      <div className="font-semibold mb-2">스타벅스</div>
                      <div className="mb-2">{item.product?.name}</div>
                      <div>
                        {order.total_price} / 수량 {item.quantity} 개
                      </div>
                      <div className="mt-1">
                        {item.reviews?.length === 0 ? (
                          <ReviewModal
                            userId={order.user_id}
                            productId={item.product?.id}
                            orderId={item.id}
                          />
                        ) : (
                          <></>
                        )}

                        {/* <Button>주문취소</Button> */}
                      </div>
                    </div>
                    <div>
                      <img
                        className="w-20 h-20"
                        src={item.product?.image_url}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistoryPage;
