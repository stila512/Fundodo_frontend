import React from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Hero from './hero';
import ProdSec from './ProdSec';
import CourseSec from './CourseSec';
import HotelSec from './HotelSec';
import ArticleSec from './ArticleSec';

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Hero />
      <ProdSec />
      <CourseSec />
      <HotelSec />
      <ArticleSec/>
    </>
  );
}

Homepage.layout = DefaultLayout;
