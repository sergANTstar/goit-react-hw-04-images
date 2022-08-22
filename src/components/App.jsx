
import css from './App.module.css';
import {SearchBar} from './SearchBar/SearchBar';
import {ImageGallery} from './Gallery/ImageGallery';
import fetchImages from '../services/API';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from './Loader/Loader';

import { useState, useEffect } from 'react';

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null)
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);


  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading (true)

if (currentPage === 1) {
  setImg([]);
}


getImg();

function getImg() {
  fetchImages(searchQuery, currentPage )
    .then(response => {
      setImg(prevImages => [...prevImages, ...response.hits]);
      setLoading(false);
      setTotalHits(response.totalHits);

      if(response.hits.length === 0) {
        setLoading(false);
        setError(Notify.warning('Sorry, nothing was found :)'))
      }
    })
    .catch(error => {
      setError(error);
      setLoading(false)
    })
    }

  }, [currentPage, searchQuery])


  

  const handleSubmit = query => {
    setSearchQuery(query);
    setImg([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(page => page + 1)
  };

  const toggleModal = () => {
    setShowModal(showModal =>!showModal);
   
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal()
  };
  

    return (
      <div className={css.App}>
        <SearchBar onSubmit={handleSubmit} />
        {img.length > 0 && !error && (
          <ImageGallery img={img} openModal={openModal} />
        )}
        {loading === true && <Loader/>}
        {img.length > 0 &&
          loading === false && img.length !== totalHits && (
            <Button onClick={loadMore} />
          )}
        {showModal && (
          <Modal onClose={toggleModal} largeImage={largeImageURL} />
        )}
      </div>
    );
}
