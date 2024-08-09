import React from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';

export default function Course() {
  return (
    <>
        <Head>
        <title>Homepage</title>
      </Head>
      <Banner/>

     
    </>
  )
}
// Coursepage.layout = DefaultLayout;
