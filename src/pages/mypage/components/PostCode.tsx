import { useDaumPostcodePopup } from 'react-daum-postcode';
export const Postcode = ({
  onComplete,
}: {
  onComplete: (data: any) => void;
}) => {
  const url = import.meta.env.VITE_DAUM_ADDRESS_SCRIPT_URL;
  const open = useDaumPostcodePopup(url);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    onComplete({
      postcode: data.zonecode,
      address: fullAddress,
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      className=" text-sm border-gray-300 border-[0.5px] p-2 rounded-none"
      type="button"
      onClick={handleClick}
    >
      우편번호 찾기
    </button>
  );
};
