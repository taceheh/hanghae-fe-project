import { ICartWithProduct } from '@/types/dto/cartDTO';

export const calculateTotalAmount = (
  data: ICartWithProduct[] | undefined,
  selectedItems: string[] | null
) => {
  return (
    data?.reduce((sum, item) => {
      if (!selectedItems || selectedItems.includes(item.id)) {
        return sum + Number(item.price) * item.quantity;
      }
      return sum;
    }, 0) || 0
  );
};

export const calculateQuantity = (selectedItems: string[]) => {
  return selectedItems.length;
};
