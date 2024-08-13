import React from 'react';
import styles from './hotelBlock.module.scss';
import { useState, useEffect } from 'react';
import hotels from '@/data/hotel.json'

export default function HotelBlock() {

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      <div className={styles.grid}>
        {hotels.map((v, i) => (
          <div key={i} className={styles.card}>
            <img src="/hotel-image.jpg" alt={v.name} className={styles.image} />
            <h3 className={styles.hotelName}>{v.name}</h3>
            <p className={styles.description}>{v.description}</p>
            <p className={styles.price}>{v.price}</p> 
            <button className={styles.button}>立即預訂</button>
          </div>
        ))}
      </div>
    </div>
  );
}
