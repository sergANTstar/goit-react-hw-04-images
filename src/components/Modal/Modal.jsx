import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#root');

export const Modal =({largeImage, onClose, alt }) =>  {   

  const backdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  const handleKeyEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown',  handleKeyEsc);
    return () => {
      window.removeEventListener('keydown', handleKeyEsc);
    };
  });


    return createPortal (
      <div className={css.modal} onClick={backdropClick}>
        <div className={css.modal__block}>
          <img 
            src={largeImage}
            alt={alt}
            className={css.modal__img}
          />
        </div>
      </div>,
      modalRoot
    );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
