import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import BackendLayout from '@/components/layout/backend'
import styles from './edit.module.scss';
import Modal from '@/components/common/modal';
import { RiImageAddFill } from "react-icons/ri";


export default function edit() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState([]);
  const fileInputRefs = [useRef(), useRef(), useRef()];
  const [previewImages, setPreviewImages] = useState([]);

  const baseURL = 'http://localhost:3005/api/hotel';

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
    valid: 0,
    images: []
  })

  //圖片字串
  useEffect(() => {
    if (hotel.main_img_path) {
      const imageArray = hotel.main_img_path.split(',').filter(img => img.trim() !== '');
      setImages(imageArray);
    } else {
      setImages([]);
    }
  }, [hotel.main_img_path]);

  //原先的旅館資料
  const getHotel = async (id) => {
    const res = await fetch(`${baseURL}/detail/${id}`);
    const data = await res.json();

    if (data.status === "success" && data.data) {
      setHotel(prevState => ({
        ...data.data,
        valid: Number(data.data.valid),
        main_img_path: data.data.main_img_path || ''
      }));
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
  const handleImageClick = (index) => {
    fileInputRefs[index].current.click();
  }


  //修改資料
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked :
        type === 'radio' ? Number(value) :
          value
    }));
  };

  const handleImagesChange = (newImages) => {
    setHotel(prevState => ({
      ...prevState,
      main_img_path: newImages
    }));
  };

  //送出表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hotelData = {
        ...hotel,
        main_img_path: images.join(',')
      };

      const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        // alert('旅館更新成功！');
        setModalContent({
          title: '成功',
          message: '旅館更新成功！'
        });
        setShowSuccessModal(true);
      } else {
        // alert('更新失敗：' + data.message);
        setModalContent({
          title: '錯誤',
          message: '旅館更新失敗，請稍後再試或聯繫網管人員。'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('發生錯誤，請稍後再試');
      setModalContent({
        title: '錯誤',
        message: '旅館更新失敗，請稍後再試或聯繫網管人員。'
      });
      setShowModal(true);
    }
  };

  //  編輯圖片
  const ImageUploadManager = ({ initialImages, onImagesChange, hotelId }) => {
    const [images, setImages] = useState(initialImages || []);
    const fileInputRefs = [useRef(), useRef(), useRef()];

    useEffect(() => {
      onImagesChange(images);
    }, [images, onImagesChange]);

    const handleImageClick = (index) => {
      fileInputRefs[index].current.click();
    }
  }

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {

      const previewURL = URL.createObjectURL(file);
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = previewURL;
      setPreviewImages(newPreviewImages);


      const formData = new FormData();
      formData.append('images', file);
      try {
        const response = await fetch(`http://localhost:3005/api/hotel/${hotel.id}/update-images`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          if (result.status === 'success' && result.data) {
            const newImages = [...images];
            newImages[index] = result.data[0];
            setImages(newImages);
            setHotel(prevHotel => ({
              ...prevHotel,
              main_img_path: newImages.join(',')
            }));
          } else {
            throw new Error(result.message || '圖片上傳失敗');
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || '圖片上傳失敗');
        }
      } catch (error) {
        console.error('圖片上傳出錯:', error);
        // alert(`圖片上傳失敗: ${error.message}`);
        setModalContent({
          title: '錯誤',
          message: `圖片上傳失敗: ${error.message}`
        });
        setShowModal(true);
      }
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    router.push('/backend/hotel');
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
          <div className={styles.imgGroup}>
              <p className={styles.title}>旅館圖片</p>
              {[0, 1, 2].map((_, index) => (
                <div key={index} className={styles.addImg} onClick={() => handleImageClick(index)}>
                  {previewImages[index] || images[index] ? (
                    <>
                      <Image
                        src={previewImages[index] || `${baseURL}/images/${images[index]}`}
                        width={180}
                        height={0}
                        sizes="200px"
                        style={{ width: '100%', height: 'auto' }}
                        alt={`旅館圖片 ${index + 1}`}
                      />
                      <div className={styles.overlay}><RiImageAddFill className={styles.addImgIcon} /></div>
                    </>
                  ) : (
                    <div>
                      <RiImageAddFill className={styles.addImgIcon} />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRefs[index]}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, index)}
                    accept="image/*"
                  />
                </div>
              ))}
            </div>
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
            <div className={styles.formGroup}>
              <p className={styles.title}>狀態</p>
              <div className={styles.radioGroup}>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="statusOnline"
                    name="valid"
                    value="1"
                    checked={hotel.valid === 1}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="statusOnline">上架</label>
                </div>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="statusOffline"
                    name="valid"
                    value="0"
                    checked={hotel.valid === 0}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="statusOffline">下架</label>
                </div>
              </div>
            </div>

            <div className={styles.btnGroup}>
              <button type="button" className={styles.cancel}>取消</button>
              <button type="submit" className={styles.update}>更新</button>
            </div>
          </form>
        </div>
      </BackendLayout>
      <Modal
        mode={2}
        active={showSuccessModal}
        onClose={handleSuccessConfirm}
        confirmText='回列表'
        cancelText='取消'
      >
        <h1>{modalContent.title}</h1>
        <p>{modalContent.message}</p>
      </Modal>
    </>
  )
}
