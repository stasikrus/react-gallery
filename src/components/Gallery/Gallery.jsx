import { useState, useEffect } from 'react';
import styles from './Gallery.module.css';
import { Modal } from '../Modal/Modal';
import useImageLoader from '../../hooks/useImageLoader';

const Gallery = ({ maxThumbnails = 10 }) => {
  const { images, isLoading, loadMoreImages } = useImageLoader(maxThumbnails);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailIndices, setThumbnailIndices] = useState({ start: 0, end: maxThumbnails });

  useEffect(() => {
    const totalImages = images.length;
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
  }, [selectedIndex, images.length, maxThumbnails, thumbnailIndices]);
  
  useEffect(() => {
    if (selectedIndex === images.length - 1) {
      loadMoreImages();
    }
  }, [selectedIndex, images.length, loadMoreImages]);
  
  const goToPrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getSideImage = (offset) => {
    const newOffset = (selectedIndex + offset + images.length) % images.length;
    return images[newOffset];
  };

  const toggleModal = () => {
    document.documentElement.style.setProperty('--modal-background-image', `url(${images[selectedIndex]})`);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.imagesRow}>
        <div className={`${styles.sideImage} ${styles.prevImage}`}>
          {selectedIndex > 0 && <img src={getSideImage(-1)} alt="Previous" onClick={goToPrev} />}
        </div>
        <div className={styles.mainImage}>
          <img src={images[selectedIndex]} alt="Selected" onClick={toggleModal} />
        </div>
        <div className={`${styles.sideImage} ${styles.nextImage}`}>
          {selectedIndex < images.length - 1 && <img src={getSideImage(1)} alt="Next" onClick={goToNext} />}
        </div>
      </div>
      <div className={styles.imageStrip}>
        <button onClick={goToPrev} disabled={selectedIndex === 0}>{'<'}</button>
        {images.slice(thumbnailIndices.start, thumbnailIndices.end).map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Thumbnail ${index + thumbnailIndices.start}`}
            onClick={() => setSelectedIndex(index + thumbnailIndices.start)}
            className={index + thumbnailIndices.start === selectedIndex ? styles.active : ''}
          />
        ))}
        <button onClick={goToNext} disabled={selectedIndex === images.length - 1}>{'>'}</button>
      </div>
      {isModalOpen && (<Modal src={images[selectedIndex]} onClose={toggleModal} />)}
    </div>
  );
};

export default Gallery;
