export const formatISOToDate = (isoDate: string): string => {
  return isoDate.split('T')[0];
};
