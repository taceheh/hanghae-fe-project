// api/order.ts
import supabase from '@/supabase';
import {
  DeliveryInfoType,
  ISubscription,
  SubsInsert,
} from '@/types/dto/subscriptionDTO';

export const insertSubscription = async (
  subData: SubsInsert
): Promise<ISubscription> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert(subData)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const insertSubscriptionItem = async (
  itemData: DeliveryInfoType
): Promise<void> => {
  const { error } = await supabase.from('subscription_items').insert(itemData);
  if (error) throw new Error(error.message);
};
