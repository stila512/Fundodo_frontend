import React, { useState, useEffect } from 'react';
import styles from './hotelImg.module.scss';
import Image from 'next/image';

export default function HotelImg({ hotelCode }) {
  const [hotel, setHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const getHotel = async () => {
      const baseURL = `http://localhost:3005/api/hotel/detail/${hotelCode}`;
      const res = await fetch(baseURL);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        const imgArr = data.data.images.split(',');
        setHotel({
          ...data.data,
          images: imgArr,
        });
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



  return (
    <>
      {hotel && (
        <>
          <div className={styles.hotelImg}>
            <div className={styles.mainImgContainer}>
              <Image
                src={`/hotelPic/pic/${hotel.images[currentImageIndex]}`}
                width={0}
                height={0}
                className={styles.mainImg}
                alt="Main Image"
              />
              <button 
                className={`${styles.arrowBtn} ${styles.rightArrow}`} 
                onClick={handleNextImage}
              >
                &gt;
              </button>
            </div>

            <div className={styles.subImg}>
              {hotel.images.slice(0, 3).map((img, index) => (
                <div key={index} className={styles.subImgContainer}>
                  <Image
                    src={`/hotelPic/pic/${img}`}
                    width={150}
                    height={110}
                    className={styles.img}
                    alt={`Sub Image ${index + 1}`}
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
