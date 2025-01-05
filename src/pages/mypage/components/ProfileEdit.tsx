import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Postcode } from './PostCode';
import useAuthStore from '@/stores/auth/useAuthStore';

const ProfileEditPage = () => {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const { user } = useAuthStore();

  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
  }) => {
    setPostcode(data.postcode); // 우편번호 저장
    setAddress(data.address); // 주소 저장
  };

  return (
    <div className="p-6 text-sm">
      <div className="text-center mb-6 text-lg font-bold">회원정보 수정</div>
      <div className="space-y-6">
        {/* 이메일 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">이메일</span>
          <Input value={user?.email} readOnly className="flex-1" />
        </div>
        {/* 이름 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">이름</span>
          <Input value={user?.name} readOnly className="flex-1" />
        </div>
        {/* 휴대번호 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-gray-600">휴대번호</span>
          <Input value={user?.phonenumber || ''} readOnly className="flex-1" />
        </div>
        {/* 주소 */}
        <div className="flex items-start gap-4">
          <span className="w-24 text-gray-600 pt-2">주소</span>
          <div className="flex flex-col flex-1 gap-2">
            <div className="">
              <Input
                type="text"
                value={postcode}
                placeholder="우편번호"
                className="w-[200px] mr-2"
              />
              <Postcode onComplete={handleAddressComplete} />
            </div>
            <Input
              type="text"
              value={address}
              placeholder="주소"
              className="w-full"
            />
            <Input type="text" placeholder="상세주소" className="w-full" />
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-center gap-4 mt-8">
        <Button className="w-[50%] bg-customBlack text-xs text-white">
          수정하기
        </Button>
        <Button className="w-[50%] text-xs border border-solid text-customBlack font-bold border-gray-200 rounded-none ">
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditPage;
