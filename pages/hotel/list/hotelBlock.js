import React from 'react';
import styles from './hotelBlock.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function HotelBlock() {
  const [hotels, setHotels] =useState([]);

  const getHotels = async () => {
    try {
      const baseURL = "http://localhost:3005/api/hotel"
      const res = await fetch(baseURL)
      const data = await res.json()
      
      console.log( data);
  
      if (data.status === "success" && Array.isArray(data.data)) {
        setHotels(data.data)
      } else {
        console.log("API 響應格式不符合預期", data);
      }
    } catch (error) {
      console.error("獲取失敗", error);
    }
  }

    useEffect(() => {
      getHotels()
    }, [])
    


  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      <div className={styles.grid}>
        {hotels.map((v) => (
          <div key={v.id} className={styles.card}>
          <div className={styles.image}>
    <Image src={`/hotelPic/pic/${v.main_img_path}`} layout="fill" objectFit="cover" alt="旅館圖片" />
  </div>
            <h3 className={styles.hotelName}>{v.name}</h3>
            <p className={styles.description}>{v.description}</p>
            <p className={styles.price}> ${v.price_small_dog}~${v.price_large_dog}</p>
            <div className={styles.Btn}>
              <Link href={`/hotel/detail/${v.id}`}>
                <button className={styles.button}>立即預訂</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}