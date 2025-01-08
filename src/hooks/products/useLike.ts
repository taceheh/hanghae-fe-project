import { useMutation } from '@tanstack/react-query';

export const useLike = () => {
  const { mutate } = useMutation({});
  return mutate;
};
