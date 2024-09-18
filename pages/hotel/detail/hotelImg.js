import React, { useState, useEffect } from 'react';
import styles from './hotelImg.module.scss';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import { IoIosArrowForward } from "react-icons/io";

export default function HotelImg({ hotelCode }) {
  const [hotel, setHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const baseURL = `http://localhost:3005/api/hotel/detail/${hotelCode}`;

  useEffect(() => {
    const getHotel = async () => {
      try {
        const res = await fetch(baseURL);
        const data = await res.json();
        if (data.status === "success" && data.data) {
          const images = data.data.images ? data.data.images.split(',') : [];
          setHotel({
            ...data.data,
            images: images,
          });
        } else {
          console.error("API返回了意外的數據結構:", data);
          setHotel({ images: [] });
        }
      } catch (error) {
        console.error("獲取酒店數據時發生錯誤:", error);
        setHotel({ images: [] });
      }
    };

    if (hotelCode) {
      getHotel();
    }
  }, [hotelCode]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % hotel.images.length
    );
  };

  // 無讀取到圖片
  const handleImageError = (event) => {
    event.target.src = 'http://localhost:3005/api/hotel/images/404.jpg';
  };

    //讀取第一個檔名
    const getImagePath = (index) => {
      if (!hotel || !hotel.images || hotel.images.length === 0) {
        return 'http://localhost:3005/api/hotel/images/404.jpg';
      }
      return `http://localhost:3005/api/hotel/images/${hotel.images[index]}`;
    };


  return (
    <>
      {hotel && (
        <>
          <div className={styles.hotelImg}>
            <div className={styles.mainImgContainer}>
              <Image
                src={`http://localhost:3005/api/hotel/images/${hotel.images[currentImageIndex] || hotel.main_img_path}`}
                width={0}
                height={0}
                className={styles.mainImg}
                alt="Main Image"
                onError={handleImageError}
              />
              <button
                className={`${styles.arrowBtn} ${styles.rightArrow}`}
                onClick={handleNextImage}
              >
                <IoIosArrowForward />
              </button>
            </div>

            <div className={styles.subImg}>
              {hotel.images.slice(0, 3).map((img, index) => (
                <div key={index} className={styles.subImgContainer}>
                <Image
                    src={getImagePath(index)}
                    width={150}
                    height={110}
                    className={styles.img}
                    alt={`Sub Image ${index + 1}`}
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
