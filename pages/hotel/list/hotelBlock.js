import React from 'react';
import styles from './hotelBlock.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HotelImg from "@/public/hotelPic/pic/HT000001.jpg"

export default function HotelBlock() {
  const [hotels, setHotels] =useState([]);

  const getHotels = async () => {
    try {
      const URL = "http://localhost:3005/api/hotel"
      const res = await fetch(URL)
      const data = await res.json()

      console.log("API response:", data);

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
            <Image src={HotelImg} width={0} height={0} alt={v.name} className={styles.image} />
            <h3 className={styles.hotelName}>{v.name}</h3>
            <p className={styles.description}>{v.description}</p>
            <p className={styles.price}>小型犬: {v.price_small_dog}元 / 中型犬: {v.price_medium_dog}元 / 大型犬: {v.price_large_dog}元</p>
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