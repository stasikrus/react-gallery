import { ACCESS_KEY, UNSPLASH_BASE_URL } from './apiConfig';

export const getRandomPhotos = (count = 10) => {
  return `${UNSPLASH_BASE_URL}?client_id=${ACCESS_KEY}&count=${count}`;
};
