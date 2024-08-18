import styles from './hotelBlock.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';

export default function HotelBlock({ searchQuery, sortOption }) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getHotels = async () => {
    try {
      const baseURL = 'http://localhost:3005/api/hotel';
      const res = await fetch(baseURL);
      const data = await res.json();
      console.log(data);
      if (data.status === 'success' && Array.isArray(data.data)) {
        setHotels(data.data);
        setFilteredHotels(data.data);
      } else {
        console.log('API 獲取格式不符合預期', data);
      }
    } catch (error) {
      console.error('獲取失敗', error);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    if (hotels.length > 0) {
      let result = [...hotels];

      // 篩選
      if (searchQuery.trim()) {
        result = result.filter((hotel) =>
          hotel.address && hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // 排序
      switch (sortOption) {
        case 'new':
          result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'priceAsc':
          result.sort((a, b) => a.price_s - b.price_s);
          break;
        case 'priceDesc':
          result.sort((a, b) => b.price_s - a.price_s);
          break;
        default:
          break;
      }

      setFilteredHotels(result);
    }
  }, [hotels, searchQuery, sortOption]);

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      {filteredHotels.length > 0 ? (
        <>
          <div className={styles.grid}>
            {currentHotels.map((v) => (
              <div key={v.id} className={styles.card}>
                <div className={styles.image}>
                  <Link href={`/hotel/detail/${v.id}`}>
                    <Image
                      src={`/hotelPic/pic/${v.main_img_path}`}
                      layout="fill"
                      objectFit="cover"
                      alt="旅館圖片"
                    />
                  </Link>
                </div>
                <h3 className={styles.hotelName}>{v.name}</h3>
                <p className={styles.description}>{v.description}</p>
                <p className={styles.price}>${v.price_s}~${v.price_l}</p>
                <div className={styles.Btn}>
                  <Link href={`/hotel/detail/${v.id}`}>
                    <button className={styles.button}>立即預訂</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            hotelsPerPage={hotelsPerPage}
            totalHotels={filteredHotels.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className={styles.noResults}>
          <p>很抱歉，沒有符合條件的旅館。請嘗試其他搜索條件。</p>
        </div>
      )}
    </div>
  );
}
