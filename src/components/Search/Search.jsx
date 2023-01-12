import React, { useState, useCallback, useContext, useRef } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const updateSeatchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    updateSeatchValue(e.target.value);
  };

  const handleCrossClick = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.cross} onClick={handleCrossClick}>
        X
      </div>
      <input
        ref={inputRef}
        onChange={handleChangeInput}
        value={value}
        placeholder="Поиск пиццы..."
        className={styles.input}></input>
    </div>
  );
};

export default Search;
