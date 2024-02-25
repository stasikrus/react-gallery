import { useState, useEffect } from 'react';
import './Gallery.css';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const perPage = 10;

  useEffect(() => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${perPage}`;

    axios.get(url)
      .then((response) => {
        setImages(response.data.map(img => img.urls.regular));
        setSelectedIndex(0);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [perPage]);

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

  return (
    <div className="gallery">
      <div className="images-row">
        <div className="side-image prev-image">
          {selectedIndex > 0 && <img src={getSideImage(-1)} alt="Previous" onClick={goToPrev} />}
        </div>
        <div className="main-image">
          <img src={images[selectedIndex]} alt="Selected" />
        </div>
        <div className="side-image next-image">
          {selectedIndex < images.length - 1 && <img src={getSideImage(1)} alt="Next" onClick={goToNext} />}
        </div>
      </div>
      <div className="image-strip">
        <button onClick={goToPrev} disabled={selectedIndex === 0}>{'<'}</button>
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedIndex(index)}
            className={index === selectedIndex ? 'active' : ''}
          />
        ))}
        <button onClick={goToNext} disabled={selectedIndex === images.length - 1}>{'>'}</button>
      </div>
    </div>
  );
  
};

export default Gallery;
