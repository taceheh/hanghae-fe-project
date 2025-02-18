const cloudName = import.meta.env.VITE_CLOUD_NAME;

export const getOptimizedImageUrl = (
  originalUrl: string,
  width: number,
  quality: number
) => {
  return `https://res.cloudinary.com/${cloudName}/image/fetch/w_${width},q_${quality},f_auto/${originalUrl}`;
};
