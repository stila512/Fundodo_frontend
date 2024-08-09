import React from 'react';
import styles from './hotelImg.module.scss';

export default function HotelImg() {
  return (
    <>
      <div className={styles.hotelImg}>
        <div className={styles.mainImg} />
        <div className={styles.subImg}>
          <div className={styles.img} />
          <div className={styles.img} />
        </div>
      </div>
    </>
  );
}
