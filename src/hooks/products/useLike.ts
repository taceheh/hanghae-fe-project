// import { toggleLikeAPI } from '@/api/products';
// import { likeType } from '@/types/dto/likeDTO';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase';
import { updateLike } from '@/api/products';
// export const useLike = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutateFn: ({ userId, productId, action }: likeType) => {
//       return toggleLikeAPI(userId, productId, action);
//     },
//     onMutate: async ({ productId, action }) => {
//       // Optimistic Update: 이전 데이터 저장
//       await queryClient.cancelQueries(['products']);
//       const previousData = queryClient.getQueryData(['products']);

//       queryClient.setQueryData(['products'], (old: any) => ({
//         ...old,
//         pages: old.pages.map((page: any) => ({
//           ...page,
//           data: page.data.map((item: any) =>
//             item.id === productId
//               ? {
//                   ...item,
//                   isLiked: action === 'LIKE',
//                 }
//               : item
//           ),
//         })),
//       }));

//       return { previousData };
//     },
//     onError: (err, _, context: any) => {
//       queryClient.setQueryData(['products'], context.previousData);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(['products']);
//     },
//   });
// };
export const useLike = (
  isLiked: boolean,
  productId: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error>({
    mutationKey: ['toggleLike', productId, userId],
    mutationFn: async () => await updateLike(isLiked, productId, userId),
    onSuccess: () => {
      queryClient.setQueryData(['isLiked', productId, userId], !isLiked);
      console.log('좋아요 업데이트 성공');
    },
  });
  return mutation;
};
