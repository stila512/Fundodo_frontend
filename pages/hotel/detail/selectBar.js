import React from 'react';
import styles from './selectBar.module.scss';
import FddBtn from '@/components/buttons/fddBtn';

export default function SearchBar() {
  return (
    <>
   <div className={styles.selectBar}>
  <button className={styles.selectBtn}>旅館簡介</button>
  <button className={styles.selectBtn}>常見問題</button>
  <button className={styles.selectBtn}>評價</button>
</div>

    </>
  );
}
