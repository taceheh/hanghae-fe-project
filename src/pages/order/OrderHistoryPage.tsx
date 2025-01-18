import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase';
import { IOrderWithDetails } from '@/types/dto/orderDTO';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/auth/useAuthStore';
import { formatISOToDate } from '@/utils/dateFormat';
import { ReviewModal } from './components/ReviewModal';
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
        product:products(*)
      )
    `
    )
    .eq('user_id', userId);
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const OrderHistoryPage = () => {
  const { user } = useAuthStore();
  if (!user) {
    console.log('사용자가 없습니다.');
    return;
  }
  const { data: orderHistories } = useQuery({
    queryKey: ['orderHistory', user?.id],
    queryFn: () => fetchOrderDetails(user.id),
    enabled: !!user?.id, //
  });
  console.log(orderHistories);
  return (
    <>
      <div className="mx-4 mt-8">
        {orderHistories?.map((order) => (
          <div key={order.id}>
            <div className="my-2">{formatISOToDate(order.created_at)}</div>
            <div className="py-4 border-t-[0.2rem] border-black">
              {order.orderItem.map((item) => (
                <div className="flex justify-between mt-3 mb-3 pb-4 text-sm  border-b-[1px] border-black">
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
                      <ReviewModal
                        userId={order.user_id}
                        productId={item.product?.id}
                      />
                      <Button>주문취소</Button>
                    </div>
                  </div>
                  <div>
                    <img className="w-20 h-20" src={item.product?.image_url} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistoryPage;
