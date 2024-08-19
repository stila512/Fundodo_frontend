import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';
import Sort from './sort';
import Tags from './tags';
import Breadcrumb from '../prod/list/breadcrumb';
import CourseGrid from './courseGrid';

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部分類');
  const [sortBy, setSortBy] = useState('newest');


  useEffect(() => {
    // 獲取課程數據
    fetch("http://localhost:3005/api/course")
      .then(res => res.json())
      .then(result => setCourses(result.data))
      .catch(err => console.log(err));

    // 獲取分類數據
    fetch("http://localhost:3005/api/course/category")
      .then(res => res.json())
      .then(result => setCategories([{ id: 0, name: '全部分類' }, ...result.data]))
      .catch(err => console.log(err));
  }, []);

  const filteredAndSortedCourses = courses
    .filter(course => selectedCategory === '全部分類' || course.tags.includes(selectedCategory))
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'mostViewed':
          return b.viewed_count - a.viewed_count;
        case 'priceLowToHigh':
          return a.sale_price - b.sale_price;
        case 'priceHighToLow':
          return b.sale_price - a.sale_price;
        default:
          return 0;
      }
    });

  return (
    <>
      <Head>
        <title>Course</title>
      </Head>
      <div className="container">
        <Banner />
        <div className='d-flex jc-between ai-center'>
          <p>Home 狗狗課程</p>
          <div className="d-flex ai-center">
            <Sort sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
        <Tags 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        categories={categories} />
        <CourseGrid courses={filteredAndSortedCourses} />
      </div>


    </>
  )
}
Course.layout = DefaultLayout;
