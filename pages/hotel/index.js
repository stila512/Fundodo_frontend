import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/index.module.scss';
import SearchBar from '@/pages/hotel/SearchBar';
import HotelBlock from './hotelBlock';

export default function HotelPage() {
  return (
    <>
      <Head>
        <title>寵物旅館住宿</title>
      </Head>
      <div className={styles.pageContainer}>
      <SearchBar />
      <HotelBlock />
      </div>
      <div >
      
      </div>
    </>
  );
}

HotelPage.layout = DefaultLayout;
