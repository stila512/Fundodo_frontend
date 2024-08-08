import React from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';
import Tags from './tags';
import Breadcrumb from '../prod/breadcrumb';
import CourseGrid from './courseGrid';

export default function Course() {
  return (
    <>
      <Head>
        <title>Course</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className='d-none d-md-block col-lg-12'>
            <Banner />
            </div>
            <div className=''>
            <Tags />
            </div>
            
            <CourseGrid />
        </div>
      </div>
    </>
  )
}
Course.layout = DefaultLayout;
