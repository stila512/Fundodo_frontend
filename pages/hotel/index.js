import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/index.module.scss';
import SearchBar from '@/pages/hotel/SearchBar';
import hotelBlock from './hotelBlock';
import Head from 'next/head';

export default function HotelPage() {
  return (
    <>
      <Head>
        <title>寵物旅館住宿</title>
      </Head>
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <SearchBar />
        </main>
        <div className={styles.mainArea}>
          <hotelBlock />
        </div>
      </div>
    </>
  );
}

HotelPage.layout = DefaultLayout;
