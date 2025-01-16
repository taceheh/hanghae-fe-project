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
import supabase from '@/supabase';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const ReviewModal = ({
  productId,
  userId,
}: {
  productId?: string;
  userId?: string;
}) => {
  const [text, setText] = useState(''); // 텍스트 상태
  const [isOpen, setIsOpen] = useState(false); // 모달 상태

  // 리뷰 저장 함수
  const insertReview = async (
    productId: string,
    userId: string,
    content: string
  ) => {
    const { data, error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_id: userId,
      comment: content,
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
    }: {
      productId: string;
      userId: string;
      content: string;
    }) => insertReview(productId, userId, content),
    onSuccess: () => {
      console.log('리뷰 저장 성공');
      setText(''); // 입력창 초기화
      setIsOpen(false); // 모달 닫기
    },
    onError: (error: any) => {
      console.error('리뷰 저장 실패:', error.message);
    },
  });

  // 저장 버튼 클릭 핸들러
  const handleSaveReview = () => {
    if (!productId || !userId) {
      console.error('필수 값이 누락되었습니다.');
      return;
    }

    mutate({
      productId,
      userId,
      content: text,
    });
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
        <div className="grid gap-4 py-4">
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
          >
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
