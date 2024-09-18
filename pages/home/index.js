import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Hero from './hero';
import ProdSec from './ProdSec';
import CourseSec from './CourseSec';
import HotelSec from './HotelSec';
import ArticleSec from './ArticleSec';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
      <ProdSec />
      <CourseSec />
      <HotelSec />
      <ArticleSec />
    </>
  );
}

Home.layout = DefaultLayout;
