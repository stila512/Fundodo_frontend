import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import styles from './edit.module.scss';

export default function edit() {
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      getHotel(id);
    }
  }, [id]);

  //獲取旅館資料
   const [hotel, setHotel] = useState({

    id: 0,
    location_id: 0,
    name: '',
    description: '',
    address: '',
    Latitude: '0',
    Longitude: '0',
    main_img_path: '',
    price_s: 0,
    price_m: 0,
    price_l: 0,
    service_food: 0,
    service_bath: 0,
    service_live_stream: 0,
    service_playground: 0,
    created_at: 0,
    valid: 0
  })

  const getHotel = async (id) => {
    const baseURL = `http://localhost:3005/api/hotel/detail/${id}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    
    console.log(data);

    if (data.status === "success" && data.data){
      setHotel(data.data);
    }
  }
  
  const fetchHotelData = async (hotelId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/hotel/${hotelId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setFormData(data.data);
      } else {
        alert('獲取旅館數據失敗：' + data.message);
      }
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      alert('發生錯誤，請稍後再試');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/api/hotel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotel),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('旅館更新成功！');
        router.push('/backend/hotel/list');
      } else {
        alert('更新失敗：' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('發生錯誤，請稍後再試');
    }
  };



  return (
    <>
         <BackendLayout>
      <Head>
        <title>編輯寵物旅館</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
        <h1>編輯資訊</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <p className={styles.title}>旅館名稱</p>
            <input
              type="text"
              name="name"
              value={hotel.name}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <p className={styles.title}>寄宿房型定價(1晚)</p>
            <label htmlFor="price_s">小型犬(10公斤以下)</label>
            <input
              type="text"
              name="price_s"
              value={hotel.price_s}
              onChange={handleInputChange}
            />
            <label htmlFor="price_m">中型犬(10公斤~25公斤)</label>
            <input
              type="text"
              name="price_m"
              value={hotel.price_m}
              onChange={handleInputChange}
            />
            <label htmlFor="price_l">大型犬(25公斤以上)</label>
            <input
              type="text"
              name="price_l"
              value={hotel.price_l}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <p className={styles.title}>提供服務</p>
            <input 
              type="checkbox" 
              name="service_food" 
              checked={hotel.service_food} 
              onChange={handleInputChange} 
            />
            <label htmlFor="service_food">提供飼料鮮食</label>
            <input 
              type="checkbox" 
              name="service_bath" 
              checked={hotel.service_bath} 
              onChange={handleInputChange} 
            />
            <label htmlFor="service_bath">寵物洗澡服務</label>
            <input 
              type="checkbox" 
              name="service_live_stream" 
              checked={hotel.service_live_stream} 
              onChange={handleInputChange} 
            />
            <label htmlFor="service_live_stream">24小時家長網路遠端監控</label>
            <input 
              type="checkbox" 
              name="service_playground" 
              checked={hotel.service_playground} 
              onChange={handleInputChange} 
            />
            <label htmlFor="service_playground">室內活動區</label>
          </div>

          {/* <div className={styles.formGroup}>
            <p className={styles.title}>所在地區</p>
            <input
              type="text"
              name="region"
              value={hotel.region}
              onChange={handleInputChange}
            />
          </div> */}
          <div className={styles.formGroup}>
            <p className={styles.title}>完整地址</p>
            <input
              type="text"
              name="address"
              value={hotel.address}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <p className={styles.title}>簡介</p>
            <textarea
              name="description"
              value={hotel.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className={styles.btnGroup}>
            <button type="button" className={styles.cancel}>取消</button>
            <button type="submit" className={styles.update}>更新</button>
          </div>
        </form>
      </div>
    </BackendLayout>
    </>
  )
}
