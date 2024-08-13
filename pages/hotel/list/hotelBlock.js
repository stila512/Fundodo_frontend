import React from 'react';
import styles from './hotelBlock.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HotelImg from "@/public/hotelPic/pic/HT000001.jpg"

export default function HotelBlock() {
  const [hotels, setHotels] =useState([]);

  useEffect(()=> {

  })

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      <div className={styles.grid}>
        {hotels.map((v, i) => (
          <div key={i} className={styles.card}>
          <Image src={HotelImg} width={0} height={0} alt={v.name} className={styles.image}/>
            {/* <img src="/hotel-image.jpg" alt={v.name} className={styles.image} /> */}
            <h3 className={styles.hotelName}>{v.name}</h3>
            <p className={styles.description}>{v.description}</p>
            <p className={styles.price}>{v.price}</p>
            <div className={styles.Btn}>
            <Link href="/hotel/detail">
              <button className={styles.button}>立即預訂</button>
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
