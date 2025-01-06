// import supabase from '@/supabase';

// export const updateUserProfile = async () => {
//   const addressData = {
//     zonecode: postcode,
//     roadAddress: address,
//     detailAddress: detailAddress,
//   };
//   const { data, error } = await supabase
//     .from('users')
//     .update({
//       phonenumber: phoneNum, // 현재 상태의 phoneNum 사용
//       address: addressData,
//     })
//     .eq('id', user?.id);

//   if (error) {
//     console.error('Error updating profile:', error);
//     alert('프로필 업데이트 중 문제가 발생했습니다.');
//   } else {
//     console.log('Profile updated successfully:', data);
//     alert('프로필이 성공적으로 업데이트되었습니다.');
//   }
// };
