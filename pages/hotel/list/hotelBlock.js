import styles from './hotelBlock.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';
import { motion } from "framer-motion";

export default function HotelBlock({ searchQuery, sortOption }) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const baseURL = 'http://localhost:3005/api/hotel';

  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getHotels = async () => {
    try {
      const res = await fetch(baseURL);
      const data = await res.json();
      // console.log(data);
      if (data.status === 'success' && Array.isArray(data.data)) {
        const validHotels = data.data.filter(hotel => hotel.valid === 1);
        setHotels(validHotels);
        setFilteredHotels(validHotels);
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

  // 無讀取到圖片
  const handleImageError = (event) => {
    event.target.src = 'http://localhost:3005/api/hotel/images/404.jpg';
  };

  //讀取第一個檔名
  const getImagePath = (main_img_path) => {
    if (!main_img_path) return 'http://localhost:3005/api/hotel/images/404.jpg';
    const filenames = main_img_path.split(',');
    return `http://localhost:3005/api/hotel/images/${filenames[0].trim()}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      {filteredHotels.length > 0 ? (
        <>
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentHotels.map((v) => (
              <motion.div
                key={v.id}
                className={styles.card}
                variants={itemVariants}
              >
                <div className={styles.image}>
                  <Link href={`/hotel/detail/${v.id}`}>
                    <Image
                      src={getImagePath(v.main_img_path)}
                      layout="fill"
                      objectFit="cover"
                      alt="旅館圖片"
                      onError={handleImageError}
                    />
                  </Link>
                </div>
                <h3 className={styles.hotelName}>{v.name}</h3>
                <p className={styles.address}>{v.address}</p>
                <p className={styles.description}>{v.description}</p>
                <p className={styles.price}>${v.price_s}~${v.price_l}</p>
                <div className={styles.Btn}>
                  <Link href={`/hotel/detail/${v.id}`}>
                    <button className={styles.button}>立即預訂</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
