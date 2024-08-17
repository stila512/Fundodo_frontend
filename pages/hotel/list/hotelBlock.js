import styles from './hotelBlock.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HotelBlock({ searchQuery, sortOption }) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const getHotels = async () => {
    try {
      const baseURL = "http://localhost:3005/api/hotel"
      const res = await fetch(baseURL)
      const data = await res.json()
      console.log(data);
      if (data.status === "success" && Array.isArray(data.data)) {
        setHotels(data.data)
        setFilteredHotels(data.data)
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

  useEffect(() => {
    filterHotels();
  }, [searchQuery, hotels])

  useEffect(() => {
    sortHotels();
  }, [sortOption, filteredHotels]);

  // 排序規則
  const sortHotels = () => {
    const sortedHotels = [...filteredHotels];
    switch (sortOption) {
      case 'new':
        sortedHotels.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'priceAsc':
        sortedHotels.sort((a, b) => a.price_s - b.price_s);
        break;
      case 'priceDesc':
        sortedHotels.sort((a, b) => b.price_s - a.price_s);
        break;
      default:
        break;
    }
    setFilteredHotels(sortedHotels);
  };

  // 篩選
  const filterHotels = () => {
    if (!searchQuery) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel =>
        hotel.address.includes(searchQuery)
      );
      setFilteredHotels(filtered);
    }
  }

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      {filteredHotels.length > 0 ? (
        <div className={styles.grid}>
          {filteredHotels.map((v) => (
            <div key={v.id} className={styles.card}>
              <div className={styles.image}>
                <Link href={`/hotel/detail/${v.id}`}>
                  <Image src={`/hotelPic/pic/${v.main_img_path}`} layout="fill" objectFit="cover" alt="旅館圖片" />
                </Link>
              </div>
              <h3 className={styles.hotelName}>{v.name}</h3>
              <p className={styles.description}>{v.description}</p>
              <p className={styles.price}> ${v.price_s}~${v.price_l}</p>
              <div className={styles.Btn}>
                <Link href={`/hotel/detail/${v.id}`}>
                  <button className={styles.button}>立即預訂</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>很抱歉，沒有符合條件的旅館。請嘗試其他搜索條件。</p>
        </div>
      )}
    </div>
  );
}