import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Postcode } from './PostCode';
import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';

const ProfileEditPage = () => {
  const [phoneNum, setPhoneNum] = useState(''); // 상태로 phoneNum 관리
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const { user } = useAuthStore();

  // 초기값 설정
  useEffect(() => {
    if (user) {
      //   console.log(user.address);
      setPhoneNum(user.phonenumber || ''); // phonenumber 초기화
      setPostcode(user?.address?.zonecode || ''); // phonenumber 초기화
      setAddress(user?.address?.roadAddress || ''); // phonenumber 초기화
      setDetailAddress(user?.address?.detailAddress || ''); // phonenumber 초기화
    }
  }, [user]);

  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
  }) => {
    setPostcode(data.postcode); // 우편번호 저장
    setAddress(data.address); // 주소 저장
  };

  const handleCancelBtn = () => {
    // 취소 시 초기값으로 되돌리기
    setPhoneNum(user?.phonenumber || '');
    setPostcode(user?.address?.zonecode || '');
    setAddress(user?.address?.roadAddress || '');
    setDetailAddress(user?.address?.detailAddress || '');
  };

  const updateUserProfile = async () => {
    const addressData = {
      zonecode: postcode,
      roadAddress: address,
      detailAddress: detailAddress,
    };
    const { data, error } = await supabase
      .from('users')
      .update({
        phonenumber: phoneNum, // 현재 상태의 phoneNum 사용
        address: addressData,
      })
      .eq('id', user?.id);

    if (error) {
      console.error('Error updating profile:', error);
      alert('프로필 업데이트 중 문제가 발생했습니다.');
    } else {
      console.log('Profile updated successfully:', data);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    }
  };

  return (
    <div className="p-6 text-sm">
      <div className="text-center mb-6 text-lg font-bold">회원정보 수정</div>
      <div className="space-y-6">
        {/* 이메일 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">이메일</span>
          <Input value={user?.email || ''} readOnly className="flex-1" />
        </div>
        {/* 이름 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">이름</span>
          <Input value={user?.name || ''} readOnly className="flex-1" />
        </div>
        {/* 휴대번호 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">휴대번호</span>
          <Input
            value={phoneNum} // 상태와 연결
            onChange={(e) => setPhoneNum(e.target.value)} // 입력값 변경 시 상태 업데이트
            placeholder="휴대번호를 입력하세요"
            className="flex-1"
          />
        </div>
        {/* 주소 */}
        <div className="flex items-start gap-4">
          <span className="w-24 text-gray-600 pt-2">주소</span>
          <div className="flex flex-col flex-1 gap-2">
            <div>
              <Input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="우편번호"
                className="w-[200px] mr-2"
              />
              <Postcode onComplete={handleAddressComplete} />
            </div>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소"
              className="w-full"
            />
            <Input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="상세주소"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={updateUserProfile}
          className="w-[50%] bg-customBlack text-xs text-white"
        >
          수정하기
        </Button>
        <Button
          onClick={handleCancelBtn}
          className="w-[50%] text-xs border border-solid text-customBlack font-bold border-gray-200 rounded-none"
        >
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditPage;
