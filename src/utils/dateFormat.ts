export const formatISOToDate = (isoDate: string): string => {
  return isoDate.split('T')[0];
};
export const formatName = (name: string): string => {
  const nameLen = name.length;
  if (nameLen === 0) return ''; // 빈 문자열 처리
  return name[0] + '*'.repeat(nameLen - 1); // 첫 글자 + 나머지를 '*'로 대체
};
