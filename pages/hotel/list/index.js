import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/list/index.module.scss';
import SearchBar from '@/pages/hotel/list/SearchBar';
import HotelBlock from './hotelBlock';
import Sort from './sort';


export default function HotelPage() {
  return (
    <>
    <Head>
      <title>寵物旅館住宿</title>
    </Head>
    <div className={styles.pageContainer}>
      {/* <div className={styles.breadcrumbs}>
        麵包屑
      </div> */}
      <SearchBar />
      <div className={styles.sortContainer}>
        <Sort />
      </div>
      <HotelBlock />
    </div>
  </>
  );
}

HotelPage.layout = DefaultLayout;
