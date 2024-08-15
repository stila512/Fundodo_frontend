import React, {useState} from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';
import Tags from './tags';
import Breadcrumb from '../prod/list/breadcrumb';
import CourseGrid from './courseGrid';

export default function Course() {
  const [selectedCate, setSelectedCate] = useState(null);

  return (
    <>
      <Head>
        <title>Course</title>
      </Head>
      <div className="container">
        <Banner />
        <Tags selectedCate={selectedCate} setSelectedCate={setSelectedCate}/>
        <CourseGrid selectedCate={selectedCate}/>
      </div>


    </>
  )
}
Course.layout = DefaultLayout;
