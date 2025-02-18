import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import supabase from '@/supabase';
import { OrderStatus } from '@/types/dto/orderDTO';

export const OrderCancelModal = ({
  orderId,
  paymentKey,
}: {
  orderId: string;
  paymentKey: string;
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const SECRET_KEY = import.meta.env.VITE_TOSS_SECRET_KEY;
  const encodedKey = btoa(`${SECRET_KEY}:`);

  const handleRadioChange = (event: { target: HTMLInputElement }) => {
    setSelectedReason(event.target.value);
  };

  const fetchOrderCancel = async () => {
    try {
      const response = await fetch(
        `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedKey}`,
          },
          body: JSON.stringify({ cancelReason: selectedReason }),
        }
      );

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      await supabase
        .from('orders')
        .update({ status: OrderStatus.주문취소 })
        .eq('id', orderId);

      setIsOpen(false);
      setTimeout(() => {
        navigate('/myHistory', { replace: true });
      }, 100);
    } catch (error) {
      console.error('취소 요청 실패:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="outline-none cursor-pointer px-2 py-0 h-[20px] hover:border-none"
        >
          주문취소
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>주문취소</DialogTitle>
          <DialogDescription>취소사유를 알려주세요</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {['고객변심', '상품문제', '배송문제', '기타'].map((reason) => (
            <label key={reason}>
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={handleRadioChange}
              />{' '}
              {reason}
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button
            className="bg-customBlack text-white rounded-none font-medium p-2 hover:text-pointColor"
            disabled={!selectedReason}
            onClick={fetchOrderCancel}
          >
            주문 취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
