import React, { useState, useEffect } from 'react';
import styles from './hotelImg.module.scss';
import Image from 'next/image';

export default function HotelImg({ hotelCode }) {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getHotel = async () => {
      const baseURL = `http://localhost:3005/api/hotel/detail/${hotelCode}`;
      const res = await fetch(baseURL);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        const imgArr = data.data.images.split(',');
        setHotel({
          ...data.data,
          mainImg: imgArr[0],
          subImg: imgArr[0],
          subImg1: imgArr[1],
          subImg2: imgArr[2]
        });
      }
    };

    if (hotelCode) {
      getHotel();
    }
  }, [hotelCode]);




  return (
    <>
      {hotel && (
        <>
          <div className={styles.hotelImg}>
            <div className={styles.mainImgContainer}>
              <Image
                src={`/hotelPic/pic/${hotel.mainImg}`}
                width={0}
                height={0}
                className={styles.mainImg}
                alt="Main Image"
              />
            </div>

            <div className={styles.subImg}>
              <div className={styles.subImgContainer}>
                <Image
                  src={`/hotelPic/pic/${hotel.subImg}`}
                  width={150}
                  height={110}
                  className={styles.img}
                  alt="Sub Image 1"
                />
              </div>
              <div className={styles.subImgContainer}>
                <Image
                  src={`/hotelPic/pic/${hotel.subImg1}`}
                  width={150}
                  height={110}
                  className={styles.img}
                  alt="Sub Image 1"
                />
              </div>
              <div className={styles.subImgContainer}>
                <Image
                  src={`/hotelPic/pic/${hotel.subImg2}`}
                  width={150}
                  height={110}
                  className={styles.img}
                  alt="Sub Image 2"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
