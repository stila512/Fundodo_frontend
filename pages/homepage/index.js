import { useState, useEffect } from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Hero from './hero';
import ProdSec from './ProdSec';
import CourseSec from './CourseSec';
import HotelSec from './HotelSec';

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
    </>
  );
}

Homepage.layout = DefaultLayout;
