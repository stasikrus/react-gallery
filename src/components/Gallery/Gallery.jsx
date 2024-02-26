import { useState, useEffect } from 'react';
import styles from './Gallery.module.css';
import { Modal } from '../Modal/Modal';
import { useImageLoader, useThumbnailIndices } from '/src/hooks';
import { Spinner } from '../Spinner/Spinner';

export const Gallery = ({ maxThumbnails = 7 }) => {
  const { images, isLoading, loadMoreImages } = useImageLoader(maxThumbnails);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxDisplayThumbnails = Math.min(maxThumbnails, 10);
  const thumbnailIndices = useThumbnailIndices(selectedIndex, images.length, maxDisplayThumbnails);

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
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.imagesRow}>
            <div className={`${styles.sideImage} ${styles.prevImage}`}>
              {selectedIndex > 0 && (
                <img src={getSideImage(-1)} alt="Previous Image" onClick={goToPrev} />
              )}
            </div>
            <div className={styles.mainImage}>
              <img src={images[selectedIndex]} alt="Selected Image" onClick={toggleModal} />
            </div>
            <div className={`${styles.sideImage} ${styles.nextImage}`}>
              {selectedIndex < images.length - 1 && (
                <img src={getSideImage(1)} alt="Next Image" onClick={goToNext} />
              )}
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
        </>
      )}
      {isModalOpen && (
        <Modal src={images[selectedIndex]} onClose={toggleModal} />
      )}
    </div>
  );
};