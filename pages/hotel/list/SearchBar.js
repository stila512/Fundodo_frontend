import React from 'react';
import styles from './SearchBar.module.scss';
import { IoIosSearch } from "react-icons/io";
import FddBtn from '@/components/buttons/fddBtn';


export default function SearchBar() {
  return (
    <>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBarContainer}>
          <div className={styles.inputGroup}>
            <p>旅館位置</p>
            <div className={styles.inputWrapper}>
              <input type="text" className={styles.searchInput} placeholder="搜尋地區..." />
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
                <option>大型犬 1, 中型犬1</option>
              </select>
            </div>
          </div>

        </div>
        <button className={styles.searchBtn} href="#">搜尋旅館</button>
      </div>

    </>
  );
}
