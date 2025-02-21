
// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateUserProfile,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user'] });
//       console.log('사용자 정보 업데이트 성공');
//     },
//     onError: (err) => {
//       console.log('사용자 정보 업데이트 중 에러 발생 : ', err);
//     },
//   });
// };
