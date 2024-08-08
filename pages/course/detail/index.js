import React from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import scss from './index.module.scss';
import DetailBanner from './detailBanner';
import LinkBar from './linkBar';
import Summary from './summary';
import CrsContent from './crsContent';
import FAQ from './FAQ';
import Tags from './tags';
import AddCart from './addCart';

export default function CourseDetail() {
  return (
    <>
      <Head>
        <title>Course Detail</title>
      </Head>
      <div className='container'>
        <div className="row">
          <DetailBanner />
          <LinkBar />
          <main className="col-12 col-lg-8">
            <Summary />
            <CrsContent />
            <FAQ />
            <Tags />
          </main>
          <aside className="col-12 col-lg-4">
            <AddCart />
          </aside>
        </div>
      </div>

    </>
  )
}

CourseDetail.layout = DefaultLayout;
