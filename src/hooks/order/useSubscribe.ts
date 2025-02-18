// hooks/order/useOrder.ts
import {
  insertSubscription,
  insertSubscriptionItem,
} from '@/api/subscriptions';
import { DeliveryInfoType, SubsInsert } from '@/types/dto/subscriptionDTO';
import { useMutation } from '@tanstack/react-query';

export const useInsertSubscription = () => {
  return useMutation({
    mutationFn: (subData: SubsInsert) => insertSubscription(subData),
  });
};

export const useInsertSubscriptionItem = () => {
  return useMutation({
    mutationFn: ({ itemData }: { itemData: DeliveryInfoType }) =>
      insertSubscriptionItem(itemData),
  });
};
