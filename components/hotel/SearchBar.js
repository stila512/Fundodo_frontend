import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputGroup}>
        <input type="text" className={styles.searchInput} />
        <button className={styles.searchButton}>搜尋 </button>
      </div>
      <input type="date" className={styles.dateInput} />
      <input type="date" className={styles.dateInput} />
      <div className={styles.selectWrapper}>
        <select className={styles.select}>
          <option>大安區1, 中正區1</option>
        </select>
      </div>
      <button className={styles.searchButton}>搜尋旅館</button>
    </div>
  );
};

export default SearchBar;
