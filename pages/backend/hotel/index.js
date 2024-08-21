import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import BackendLayout from '@/components/layout/backend'
import styles from './index.module.scss';
import { CiRead } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaCircleDot } from "react-icons/fa6";

export default function List() {

  const [hotels, setHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const [statusCounts, setStatusCounts] = useState({ all: 0, active: 0, inactive: 0 });
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getHotels = async () => {
    try {
      const baseURL = 'http://localhost:3005/api/hotel';
      const res = await fetch(baseURL);
      const data = await res.json();
      // console.log(data);
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

  //上下架狀態
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
            <button className={styles.addBtn}>新增旅館</button>
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
              未刊登({statusCounts.inactive})</li>
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
                    src={`/hotelPic/pic/${hotel.main_img_path}`}
                    width={100} height={80}
                    alt="旅館圖片"
                  /></td>
                  <td>{hotel.name}</td>
                  <td>{hotel.address}</td>
                  <td>NT${hotel.price_s}~NT${hotel.price_l}</td>
                  <td>
                  {/* <button className={styles.statusBtn}>
                  <FaCircleDot className={styles.statusDot} /> */}
                  {hotel.valid === 1 ? '上架中' : '未刊登'}
                  {/* </button> */}
                  </td>
                  <td>{hotel.created_at}</td>
                  <td>
                    <button className={styles.actionBtn}> <CiRead className={styles.icon} /> </button>
                    <button className={styles.actionBtn}> <FaEdit className={styles.icon} /> </button>
                    <button className={styles.actionBtn}> <RiDeleteBin5Line className={styles.icon} /> </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BackendLayout>
    </>
  )
}

