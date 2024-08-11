import React from 'react';
import styles from './hotelBlock.module.scss';


export default function HotelBlock() {
  const hotels = [
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200' },
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200'},
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200'},
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200'},
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200'},
    { name: '小森林寵物美容旅館', description: '提供寬敞舒適的住宿空間，配備先進的設施和專業的照顧團隊，讓您的狗狗享受最優質的住宿體驗。' , price: 'TWD$ 600 - 1,200'},
  ];

  return (
    <div className={['container', styles.container].join(' ')}>
      <h3 className={styles.h3}>推薦旅館</h3>
      <div className={styles.grid}>
        {hotels.map((hotel, index) => (
          <div key={index} className={styles.card}>
            <img src="/hotel-image.jpg" alt={hotel.name} className={styles.image} />
            <h3 className={styles.hotelName}>{hotel.name}</h3>
            <p className={styles.description}>{hotel.description}</p>
            <p className={styles.price}>{hotel.price}</p> 
            <button className={styles.button}>立即預訂</button>
          </div>
        ))}
      </div>
    </div>
  );
}