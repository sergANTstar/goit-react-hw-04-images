import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from './search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';

export const SearchBar = props => {

  const [query, searchQuery] = useState('');

  const handleChange = e => {
    const {value} = e.currentTarget;
     searchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  
      if (query.trim() === '') {
      return Notify.warning('Please, enter a query!');
    };
    props.onSubmit(query);
    searchQuery ('');
  }

    return (
      <header className={css.searchBar}>
        <form className={css.searchBar__form} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchBar__button}>
            <SearchIcon width="30" height="30" />
            <span className={css.searchBar__label}>Search</span>
          </button>
          <input
            className={css.searchBar__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images..."
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

