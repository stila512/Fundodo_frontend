import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/detail/index.module.scss';
import SelectDetail from './selectDetail';
import HotelImg from './hotelImg';
import SelectBar from './selectBar'
import Content from './content'
import Breadcrumb from '../list/breadcrumb';



export default function HotelPage() {
  
  const router = useRouter();
  const { hotelCode } = router.query; 


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

  useEffect(() => {
    if(router.isReady) {
      console.log(router.query)

      getHotel(router.query.hotelCode)
    }
  }, [router.isReady])

  useEffect(() => {
    if(hotel.name) {
      document.title = `${hotel.name} - 立即預定 | Fundodo`;
    }
  },[hotel.name])


  return (
    <>
      <Head>
      <title>{hotel.name ? `${hotel.name} - 立即預定 | Fundodo` : '立即預定 | Fundodo'}</title>
      </Head>
      <div className={styles.pageContainer}>
      <Breadcrumb />
        <div className={styles.container}>
          <HotelImg hotelCode={router.query.hotelCode}/>
          {/* <div className={styles.wrapper}> */}
          <SelectDetail hotelCode={router.query.hotelCode} />
          {/* </div> */}
        </div>
        <SelectBar/>
        <Content hotelCode={router.query.hotelCode}/>
      </div>
    </>
  );
}

HotelPage.layout = DefaultLayout;
