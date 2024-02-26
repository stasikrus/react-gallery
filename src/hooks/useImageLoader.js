import { useState, useEffect } from 'react';
import axios from 'axios';
import { getRandomPhotos } from '../api/unsplashService';

export const useImageLoader = (perPage) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const url = getRandomPhotos(perPage);
        const response = await axios.get(url);
        setImages(response.data.map(img => img.urls.regular));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [perPage]);

  const loadMoreImages = async () => {
    try {
      const url = getRandomPhotos(1);
      const response = await axios.get(url);
      const newImage = response.data[0].urls.regular;
      if (!images.includes(newImage)) {
        setImages(prevImages => [...prevImages, newImage]);
      } else {
        loadMoreImages();
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  return { images, isLoading, loadMoreImages };
};