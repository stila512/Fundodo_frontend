import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';
import Sort from './sort';
import Tags from './tags';
import scss from './index.module.scss';
import Breadcrumb from '../prod/list/breadcrumb';
import CourseGrid from './courseGrid';

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部分類');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 9;


  useEffect(() => {
    // 獲取課程數據
    fetch('http://localhost:3005/api/course')
      .then(res => res.json())
      .then(result => {
        const processedCourses = result.data.map(course => ({
          ...course,
          img_path: course.img_path ? `/images/${course.img_path}` : null
        }));
        setCourses(processedCourses);
      })
      .catch(err => console.log(err));

    // 獲取分類數據
    fetch("http://localhost:3005/api/course/tags")
      .then(res => res.json())
      .then(result => setCategories([{ id: 0, name: '全部分類' }, ...result.data]))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter(course => 
      selectedCategory === '全部分類' || course.tags.includes(selectedCategory)
    );

    const sortedCourses = [...filteredCourses].sort((a, b) => {
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

    setTotalPages(Math.ceil(sortedCourses.length / coursesPerPage));
    const startIndex = (currentPage - 1) * coursesPerPage;
    setDisplayedCourses(sortedCourses.slice(startIndex, startIndex + coursesPerPage));
  }, [courses, selectedCategory, sortBy, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 重置到第一頁
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // 重置到第一頁
  };


  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

  
      return pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={number === currentPage ? scss.activePage : ''}
        >
          {number}
        </button>
      ));
    };
  

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
            <Sort sortBy={sortBy} setSortBy={handleSortChange} />
          </div>
        </div>
        <Tags
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          categories={categories} />
        <CourseGrid courses={displayedCourses} />

        <div className={scss.pagination}>
            {renderPagination()}
          </div>
      </div>


    </>
  )
}
Course.layout = DefaultLayout;
