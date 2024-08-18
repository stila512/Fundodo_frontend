import React,{ useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';
import { IoIosSearch } from "react-icons/io";
import FddBtn from '@/components/buttons/fddBtn';

//加了onSearch
export default function SearchBar({onSearch}) {
const [query, setQuery] = useState('');

//--props
const handleChange = (e) => {
  setQuery(e.target.value);
};

const handleSearch = () => {
  onSearch(query);
};
//--
  
  return (
    <>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBarContainer}>
          <div className={styles.inputGroup}>
            <p>旅館位置</p>
            <div className={styles.inputWrapper}>
              <input type="text" 
              value={query}
              onChange={handleChange}
              className={styles.searchInput} 
              placeholder="搜尋地區..." />

              <IoIosSearch className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <p>入住日</p>
            <div className={styles.inputWrapper}>
              <input type="date" className={styles.dateInput} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <p>退房日</p>
            <div className={styles.inputWrapper}>
              <input type="date" className={styles.dateInput} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <p>房型</p>
            <div className={styles.selectWrapper}>
              <select className={styles.select}>
              <option value="">請選擇房型</option>
                <option value="小型犬">小型犬(10公斤以下)</option>
                <option value="中型犬">中型犬(10~25公斤)</option>
                <option value="大型犬">大型犬(25公斤以上)</option>
              </select>
            </div>
          </div>

        </div>
        <button className={styles.searchBtn} onClick={handleSearch}>搜尋旅館</button>
      </div>

    </>
  );
}
