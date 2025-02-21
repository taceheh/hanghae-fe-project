import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!isOpen) return; // 모달이 열리지 않으면 아무것도 하지 않음
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="z-[9999] bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>장바구니 추가 완료</AlertDialogTitle>
          <AlertDialogDescription>
            선택하신 상품이 장바구니에 담겼습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onClose}>쇼핑 계속하기</Button>
          <Button onClick={() => (window.location.href = '/cart')}>
            장바구니 가기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CartModal;
