import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/detail/index.module.scss';
import SelectDetail from './selectDetail';
import HotelImg from './hotelImg';
import SelectBar from './selectBar'
import Content from './content'
import { useRouter } from 'next/router';


export default function HotelPage() {
  
  const router = useRouter();
  const { hotelCode } = router.query;

  return (
    <>
      <Head>
        <title>立即預定</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <HotelImg />
          <div className={styles.wrapper}>
            <SelectDetail hotelCode={hotelCode} />
          </div>
        </div>
        <SelectBar hotelCode={hotelCode}/>
        <Content hotelCode={hotelCode}/>
      </div>
    </>
  );
}

HotelPage.layout = DefaultLayout;
