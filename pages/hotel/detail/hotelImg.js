import React, { useState } from 'react';
import styles from './hotelImg.module.scss';
import mainImg from '@/public/hotelPic/pic/HT000001.jpg'
import subImg1 from '@/public/hotelPic/pic/HT000005.jpg'
import subImg2 from '@/public/hotelPic/pic/HT000003.jpg'
import Image from 'next/image';


export default function HotelImg() {
  const [currentMainImg, setCurrentMainImg] = useState(mainImg);
  const handleImageClick = (imgSrc) => {
    setCurrentMainImg(imgSrc);
  };


  return (
    <>
      <div className={styles.hotelImg}>
        <Image src={currentMainImg} width={0} height={0} className={styles.mainImg} />
        <div className={styles.subImg}>
          <Image src={subImg1} width={130} height={110} className={styles.img} onClick={() => handleImageClick(subImg1)} alt="Sub Image 1" />
          <Image src={subImg2} width={130} height={110} className={styles.img} onClick={() => handleImageClick(subImg2)} alt="Sub Image 2" />
        </div>
      </div>
    </>
  );
}
