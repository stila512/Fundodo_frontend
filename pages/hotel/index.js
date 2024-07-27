import React from 'react';
import NavHeader from '@/components/common/navHeader';
import SearchBar from '@/components/hotel/SearchBar';
import Head from 'next/head';

export default function HotelPage() {
  return (
    <>
      <Head>
        <title>寵物旅館住宿</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavHeader />
      </div>
      <div>
        <SearchBar />
      </div>
    </>
  );
}
