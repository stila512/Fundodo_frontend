import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import BackendLayout from '@/components/layout/backend'
import styles from './index.module.scss';
import Modal from '@/components/common/modal';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaCircleDot } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { TiArrowUnsorted } from "react-icons/ti";

// todo 旅館id排序


export default function List() {

  const initModalState = {
    show: false,
    title: '',
    message: '',
    onConfirm: null
  };
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [modalState, setModalState] = useState(initModalState);

  const [hotels, setHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const [statusCounts, setStatusCounts] = useState({ all: 0, active: 0, inactive: 0 });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = 'http://localhost:3005/api/hotel';

  //獲取全部
  const getHotels = async () => {
    try {
      const res = await fetch(baseURL);
      const data = await res.json();
      console.log(data);

      if (data.status === 'success' && Array.isArray(data.data)) {
        setHotels(data.data);
        setFilteredHotels(data.data);

        // 計算狀態數量
        const counts = hotels.reduce((acc, hotel) => {
          acc.all++;
          if (hotel.valid === 1) acc.active++;
          else acc.inactive++;
          return acc;
        }, { all: 0, active: 0, inactive: 0 });

        setStatusCounts(counts);
      } else {
        console.log('API 獲取格式不符合預期', data);
      }
    } catch (error) {
      console.error('獲取失敗', error);
    }
  }
  useEffect(() => {
    getHotels()
  }, [])

  //搜尋
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = () => {
    const filtered = hotels.filter(hotel =>
      (hotel.name && hotel.name.includes(searchTerm)) ||
      (hotel.address && hotel.address.includes(searchTerm))
    )
    setFilteredHotels(filtered)
  }

  //紀錄上下架狀態跟數量
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    if (status === 'all') {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel =>
        status === 'active' ? hotel.valid === 1 : hotel.valid === 0
      );
      setFilteredHotels(filtered);
    }
  }

  //刪除
  // const handleDelete = async (id) => {
  //   if (!confirm('確定要刪除這個旅館嗎？')) {
  //     return;
  //   }

  //   setIsLoading(true); // 添加載入狀態
  const handleDelete = (id) => {
    setDeletingId(id);
    setModalContent({
      title: '確認刪除',
      message: '確定要刪除這個旅館嗎？'
    });
    setShowDeleteConfirmModal(true);
  };
  
  const confirmDelete = async () => {
    if (deletingId === null) return;
    
    setIsLoading(true);
    setShowDeleteConfirmModal(false);
    
    try {
      const response = await fetch(`http://localhost:3005/api/hotel/${deletingId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setModalContent({
          title: '成功',
          message: '旅館已成功刪除。'
        });
        await getHotels(); // 重新獲取數據
      } else {
        const errorData = await response.json();
        setModalContent({
          title: '失敗',
          message: `刪除失敗: ${errorData.message || response.statusText}`
        });
      }
    } catch (error) {
      console.error('刪除過程中發生錯誤:', error);
      setModalContent({
        title: '失敗',
        message: '刪除過程中發生錯誤，請稍後再試。'
      });
    } finally {
      setIsLoading(false);
      setShowModal(true);
      setDeletingId(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setDeletingId(null);
  };

  // 無讀取到圖片
  const handleImageError = (event) => {
    event.target.src = 'http://localhost:3005/api/hotel/images/404.jpg';
  };

  const handleStatusChange = (hotelId, newStatus) => {
    setHotels(prevHotels =>
      prevHotels.map(hotel =>
        hotel.id === hotelId ? { ...hotel, valid: newStatus } : hotel
      )
    );
    setFilteredHotels(prevFilteredHotels =>
      prevFilteredHotels.map(hotel =>
        hotel.id === hotelId ? { ...hotel, valid: newStatus } : hotel
      )
    );
  };

  const getImagePath = (main_img_path) => {
    if (!main_img_path) return 'http://localhost:3005/api/hotel/images/404.jpg';
    const filenames = main_img_path.split(',');
    return `http://localhost:3005/api/hotel/images/${filenames[0].trim()}`;
  };



  return (
    <>
      <BackendLayout>
        <Head>
          <title>Fundodo後台 - 旅館管理</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className={styles.hotelPage}>
          <h1>寵物旅館列表</h1>
          <div className={styles.topBar}>
            <Link href={`/backend/hotel/add`}>
              <button className={styles.addBtn}>新增旅館</button>
            </Link>
            <div className={styles.searchBar}>
              <input type="text"
                className={styles.searchInput}
                placeholder="搜尋..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className={styles.searchBtn}
                onClick={handleSearch}
              > <IoIosSearch /> </button>
            </div>
          </div>
          <div className={styles.statusBar}>
            <ul>
              <li onClick={() => handleStatusSelect('all')}
                className={selectedStatus === 'all' ? styles.active : ''}>
                全部({statusCounts.all})
              </li>
              <li onClick={() => handleStatusSelect('active')}
                className={selectedStatus === 'active' ? styles.active : ''}>
                上架中({statusCounts.active})</li>
              <li onClick={() => handleStatusSelect('inactive')}
                className={selectedStatus === 'inactive' ? styles.active : ''}>
                已下架({statusCounts.inactive})</li>
            </ul>
          </div>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>旅館ID</th>
                <th>主要圖片</th>
                <th>旅館名稱</th>
                <th>地址</th>
                <th>價格範圍</th>
                <th>狀態</th>
                <th>建立日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel, index) => (
                <tr key={hotel.id || index}>
                  <td>{hotel.id}</td>
                  <td> <Image
                    src={getImagePath(hotel.main_img_path)}
                    width={100} height={80}
                    alt="旅館圖片"
                    onError={handleImageError}
                  /></td>
                  <td class={styles.name}>{hotel.name}</td>
                  <td class={styles.address}>{hotel.address}</td>
                  <td>NT${hotel.price_s}~NT${hotel.price_l}</td>
                  <td>
                    <button
                      className={hotel.valid === 1 ? styles.statusBtnOnline : styles.statusBtnOffline}
                    >
                      <FaCircleDot className={hotel.valid === 1 ? styles.statusDotOnline : styles.statusDotOffline} />
                      {hotel.valid === 1 ? '上架中' : '已下架'}
                    </button>
                  </td>
                  <td>
                    {new Date(hotel.created_at).toLocaleDateString()} {new Date(hotel.created_at).toLocaleTimeString()}
                  </td>
                  <td>
                    <Link href={`/hotel/detail/${hotel.id}`}>
                      <button className={styles.actionBtn}> <MdRemoveRedEye className={styles.icon} /> </button>
                    </Link>
                    <Link href={`/backend/hotel/${hotel.id}`}>
                      <button className={styles.actionBtn}> <FaEdit className={styles.icon} /> </button>
                    </Link>
                    {/* 刪除鍵 */}
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDelete(hotel.id)}
                      disabled={isLoading}
                    >
                      <RiDeleteBin5Line className={styles.icon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BackendLayout>
      <Modal
        mode={1}
        active={showModal}
        onClose={() => setShowModal(false)}
        confirmText='確認'
      >
        <h1>{modalContent.title}</h1>
        <p>{modalContent.message}</p>
      </Modal>

      <Modal
        mode={2}
        active={showDeleteConfirmModal}
        onClose={cancelDelete}
        confirmText='刪除'
        cancelText='取消'
        onConfirm={confirmDelete}
      >
        <h1>{modalContent.title}</h1>
        <p>{modalContent.message}</p>
      </Modal>
    </>
  )
}

