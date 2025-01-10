import { ICartWithProduct } from '@/types/dto/cartDTO';

export const calculateTotalAmount = (
  data: ICartWithProduct[] | undefined,
  selectedItems: string[]
) => {
  return (
    data?.reduce((sum, item) => {
      if (selectedItems.includes(item.id)) {
        return sum + Number(item.price) * item.quantity;
      }
      return sum;
    }, 0) || 0
  );
};
