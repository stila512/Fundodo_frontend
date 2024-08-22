import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import styles from './add.module.scss';
import Image from 'next/image';
import { RiImageAddFill } from "react-icons/ri";


export default function Add() {

  //獲取選單的縣市
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('http://localhost:3005/api/hotel/cities');
      const data = await response.json();
      if (data.status === 'success') {
        setCities(data.data); 
      }
    };
  
    fetchCities();
  }, []);



  // 新增傳入資料庫
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    price_s: '',
    price_m: '',
    price_l: '',
    service_food: false,
    service_bath: false,
    service_live_stream: false,
    service_playground: false,
    location_id: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/api/hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('旅館新增成功！');
      } else {
        alert('新增失敗：' + data.message);
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
          <title>新增寵物旅館</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className={styles.container}>
          <h1>新增寵物旅館</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.imgGroup}>
              <p className={styles.title}>旅館圖片</p>
              <div className={styles.addImg}>
      <RiImageAddFill className={styles.addImgIcon} />
        
              </div>
            </div>
            <div className={styles.formGroup}>
              <p className={styles.title}>旅館名稱</p>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <p className={styles.title}>寄宿房型定價(1晚)</p>
              <label htmlFor="price_s">小型犬(10公斤以下)</label>
              <input type="text" name="price_s" value={formData.price_s} onChange={handleInputChange} />
              <label htmlFor="price_m">中型犬(10公斤~25公斤)</label>
              <input type="text" name="price_m" value={formData.price_m} onChange={handleInputChange} />
              <label htmlFor="price_l">大型犬(25公斤以上)</label>
              <input type="text" name="price_l" value={formData.price_l} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <p className={styles.title}>提供服務</p>
              <input type="checkbox" name="service_food" checked={formData.service_food} onChange={handleInputChange} />
              <label htmlFor="service_food">提供飼料鮮食</label>
              <input type="checkbox" name="service_bath" checked={formData.service_bath} onChange={handleInputChange} />
              <label htmlFor="service_bath">寵物洗澡服務</label>
              <input type="checkbox" name="service_live_stream" checked={formData.service_live_stream} onChange={handleInputChange} />
              <label htmlFor="service_live_stream">24小時家長網路遠端監控</label>
              <input type="checkbox" name="service_playground" checked={formData.service_playground} onChange={handleInputChange} />
              <label htmlFor="service_playground">室內活動區</label>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.title}>縣市</p>
              <select name="location_id" value={formData.location_id} onChange={handleInputChange}>
                <option value="">請選擇縣市</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <p className={styles.title}>完整地址</p>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <p className={styles.title}>旅館簡介</p>
              <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
            </div>

            <div className={styles.btnGroup}>
              <button type="button" className={styles.cancel}>取消</button>
              <button type="submit" className={styles.update}>
                新增
              </button>
            </div>
          </form>
        </div>

      </BackendLayout>
    </>
  )
}
