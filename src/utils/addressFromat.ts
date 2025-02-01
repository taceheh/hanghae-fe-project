export const addressFormat = ({
  zonecode,
  roadAddress,
  detailAddress,
}: {
  zonecode: string;
  roadAddress: string;
  detailAddress: string;
}) => {
  return '(' + zonecode + ') ' + roadAddress + ' ' + detailAddress;
};
