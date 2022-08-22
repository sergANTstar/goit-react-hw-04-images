import React from 'react';
import PropTypes from 'prop-types';
import css from './Gallery.module.css';

export function ImageGalleryItem({ smallImg, alt, openModal }) {
  return (
    <li className={css.gallery__item} onClick={openModal}>
      <img className={css.gallery__image} src={smallImg} alt={alt} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
