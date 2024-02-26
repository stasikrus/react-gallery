import { useState, useEffect } from 'react';

export const useThumbnailIndices = (selectedIndex, totalImages, maxThumbnails) => {
  const [thumbnailIndices, setThumbnailIndices] = useState({ start: 0, end: maxThumbnails });

  useEffect(() => {
    let start = thumbnailIndices.start;
    let end = start + maxThumbnails;

    if (selectedIndex === end && selectedIndex < totalImages - 1) {
      start++;
      end = start + maxThumbnails;
    } else if (selectedIndex === start - 1 && start > 0) {
      start--;
      end = start + maxThumbnails;
    }

    if (start !== thumbnailIndices.start || end !== thumbnailIndices.end) {
      setThumbnailIndices({ start, end });
    }
  }, [selectedIndex, totalImages, maxThumbnails, thumbnailIndices]);

  return thumbnailIndices;
};