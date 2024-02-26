import styles from './Modal.module.css';

export const Modal = ({ src, onClose }) => {
    
    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalBlurBackground} />
        <div className={styles.modalContent}>
          <img src={src} alt="Modal Image" />
        </div>
      </div>
    );
  };
  

  