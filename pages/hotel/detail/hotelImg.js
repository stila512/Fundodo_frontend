import React, { useState } from 'react';
import styles from './hotelImg.module.scss';
import mainImg from '@/public/hotelPic/pic/HT000021.jpg'
import subImg1 from '@/public/hotelPic/pic/HT000022.jpg'
import subImg2 from '@/public/hotelPic/pic/HT000023.jpg'
import Image from 'next/image';


export default function HotelImg() {
  const [currentMainImg, setCurrentMainImg] = useState(mainImg);
  const handleImageClick = (imgSrc) => {
    setCurrentMainImg(imgSrc);

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
