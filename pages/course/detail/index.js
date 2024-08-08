import React from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import DetailBanner from './detailBanner';
import LinkBar from './linkBar';

export default function CourseDetail() {
  return (
    <>
        <Head/>
        <DetailBanner/>
        <LinkBar/>
    </>
  )
}

CourseDetail.layout = DefaultLayout;
