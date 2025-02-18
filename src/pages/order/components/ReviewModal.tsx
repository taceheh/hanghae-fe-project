import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { IoStarSharp } from 'react-icons/io5';
import supabase from '@/supabase';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const ReviewModal = ({
  productId,
  userId,
  orderId,
}: {
  productId?: string;
  userId?: string;
  orderId?: string;
}) => {
  const [text, setText] = useState(''); // 텍스트 상태
  const [rating, setRating] = useState<number>(0); // 별점 상태
  const [isOpen, setIsOpen] = useState(false); // 모달 상태
  const navigate = useNavigate();

  // 별점 선택 핸들러
  const handleSetRating = (value: number) => {
    setRating(value);
  };

  // 리뷰 저장 함수
  const insertReview = async (
    productId: string,
    userId: string,
    content: string,
    rating: number,
    orderId: string
  ) => {
    const { data, error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_id: userId,
      comment: content,
      rating, // 별점 저장 추가
      order_item_id: orderId,
    });

    if (error) {
      console.error('리뷰 저장 실패:', error);
      throw new Error(error.message);
    }

    console.log('리뷰 저장 성공:', data);
    return data;
  };

  // useMutation 훅
  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      userId,
      content,
      rating,
      orderId,
    }: {
      productId: string;
      userId: string;
      content: string;
      rating: number;
      orderId: string;
    }) => insertReview(productId, userId, content, rating, orderId),
    onSuccess: () => {
      console.log('리뷰 저장 성공');
      setText('');
      setRating(0); // 별점 초기화
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.error('리뷰 저장 실패:', error.message);
    },
  });

  // 저장 버튼 클릭 핸들러
  const handleSaveReview = () => {
    if (!productId || !userId || !orderId) {
      console.error('필수 값이 누락되었습니다.');
      return;
    }

    if (rating === 0) {
      console.error('별점을 선택해주세요.');
      return;
    }

    mutate({
      productId,
      userId,
      content: text,
      rating,
      orderId,
    });
    navigate('/myHistory');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          리뷰쓰기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription>
            주문하신 상품에 대한 리뷰를 작성해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {/* ⭐ 별점 선택 UI 추가 */}
          <div className="flex  gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <IoStarSharp
                key={value}
                size={28}
                className={`cursor-pointer transition ${
                  value <= rating ? 'text-customBlack' : 'text-gray-300'
                }`}
                onClick={() => handleSetRating(value)}
              />
            ))}
          </div>

          {/* 리뷰 입력창 */}
          <Textarea
            id="review"
            placeholder="리뷰 내용을 작성해주세요"
            className="col-span-3 w-50 h-40 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-customBlack text-white rounded-none font-medium p-2 hover:text-pointColor"
            onClick={handleSaveReview}
            disabled={text.length === 0 || rating === 0} // 리뷰 입력이 없거나 별점이 없으면 비활성화
          >
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
