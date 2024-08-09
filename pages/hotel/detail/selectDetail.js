import React from 'react';
import styles from './selectDetail.module.scss';
import FddBtn from '@/components/buttons/fddBtn';

export default function SearchBar() {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.info}>
          <h2 className={styles.title}>D&amp;Y 寵物美容時尚旅店</h2>
          <p className={styles.address}>桃園市中壢區新生路二段13號</p>
          <p className={styles.date}>1晚房價 (7月10日~ 7月11日)</p>
          <h1 className={styles.price}>$NT1200</h1>
          <p className={styles.detail}>含稅費及其他費用</p>
        </div>
        <div className={styles.select}>
          <div className={styles.selectContainer}>
            <input type="date" />
            <input type="date" />
          </div>
          <select className={styles.petSelect}>
            <option value="大型犬 1 , 中型犬1">大型犬 1 , 中型犬1</option>
          </select>
          <div className={styles.btn}>
            <FddBtn href="#">立即預定</FddBtn>
          </div>
        </div>
        <div className={styles.map} />
      </div>
    </>
  );
}
