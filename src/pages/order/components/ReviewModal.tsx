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

export const ReviewModal = ({ productId: string }) => {
  const handleSaveReview = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">리뷰쓰기</Button>
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
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-customBlack text-white rounded-none font-medium p-2  hover:text-pointColor"
            onClick={handleSaveReview}
          >
            리뷰 저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
