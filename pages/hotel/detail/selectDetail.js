import React, { useState, useEffect } from 'react';
import styles from './selectDetail.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import { RiCoupon2Line } from "react-icons/ri";

export default function SelectDetail({ hotelCode }) {  
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getHotel = async () => {
      const baseURL = `http://localhost:3005/api/hotel/detail/${hotelCode}`; 
      const res = await fetch(baseURL);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setHotel(data.data);
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
          <div className={styles.wrap}>
            <div className={styles.info}>
              <h2 className={styles.title}>{hotel.name}</h2>
              <p className={styles.address}>{hotel.address}</p>
              <p className={styles.date}>1晚房價 (7月10日~ 7月11日)</p>
              <h1 className={styles.price}>
                ${hotel.price_s}~${hotel.price_l}
              </h1>
              <p className={styles.detail}>含稅費及其他費用</p>
            </div>

            <div className={styles.coupon}>
              <span className={styles.couponIcon}><RiCoupon2Line /></span>
              專屬優惠券 NT$ 50
            </div>

            <div className={styles.select}>
              <div className={styles.selectContainer}>
              <div className={styles.detailTitle}>
                <p>入住日</p>  
                <p>退房日</p>
                </div>
                <input type="date" />
                <input type="date" />
              </div>
              <div className={styles.detailTitle}>
              <p>房型</p>
              </div>
              <select className={styles.petSelect}>
                <option value="大型犬 1 , 中型犬1">大型犬 1 , 中型犬1</option>
              </select>
              <div>
                <button className={styles.btn}>立即預定</button>
              </div>
            </div>

            <div className={styles.map} />
          </div>

          <div className={styles.wrapMobile}>
            <h2 className={styles.title}>{hotel.name}</h2>
            <div className={styles.infoGrid}>
              <div>
                <p className={styles.label}>入住時間</p>
                <p className={styles.value}>7月10日週三</p>
              </div>
              <div>
                <p className={styles.label}>退房時間</p>
                <p className={styles.value}>7月11日週四</p>
              </div>

              <div className={styles.roomInfo}>
                <p className={styles.label}>房間數與狗狗數量</p>
                <p className={styles.value}>2間房 - 大型犬 1，中型犬 1</p>
              </div>
            </div>

            <div className={styles.priceInfo}>
              <p className={styles.date}>1晚房價 (7月10日~ 7月11日)</p>
              <h1 className={styles.price}>
                ${hotel.price_s}~${hotel.price_l}
              </h1>
              <p className={styles.detail}>含稅費及其他費用</p>
            </div>

            <div className={styles.coupon}>
              <span className={styles.couponIcon}><RiCoupon2Line /></span>
              專屬優惠券 NT$ 50
            </div>

            <div className={styles.map}>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.3596535622373!2d121.5246267110192!3d25.021865877731763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a98c1c535125%3A0x3bedfec1e226eefc!2zV1NQQeWvteeJqeaXhemkqA!5e0!3m2!1szh-TW!2stw!4v1723521419174!5m2!1szh-TW!2stw"
                width={420}
                height={216}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              /> */}
            </div>

            <p className={styles.address}>{hotel.address}</p> 
          </div>
        </>
      )}
    </>
  );
}
