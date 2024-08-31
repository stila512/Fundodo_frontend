import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Banner from './banner';
import Sort from './sort';
import Tags from './tags';
import scss from './index.module.scss';
import Breadcrumb from '../prod/list/breadcrumb';
import CourseGrid from './courseGrid';

export default function Course() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('全部分類');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 9;


  useEffect(() => {
    // 獲取課程數據
    fetch(`http://localhost:3005/api/course?page=${currentPage}&perPage=${coursesPerPage}&tag=${selectedTag}&sort=${sortBy}`)
      .then(res => res.json())
      .then(result => {
        const processedCourses = result.data.map(course => ({
          ...course,
          imgPath: result.img_path ? `http://localhost:3005/upload/crs_images/${course.img_path}` : null
        }));
        setCourses(processedCourses);
        setDisplayedCourses(processedCourses); // 直接設置顯示的課程
        setTotalPages(result.totalPages); // 使用 API 返回的總頁數
      })
      .catch(err => console.log(err));
  
    // 獲取分類數據（如果還沒有獲取）
    if (tags.length === 0) {
      fetch("http://localhost:3005/api/course/tags")
        .then(res => res.json())
        .then(result => setTags([{ id: 0, name: '全部分類' }, ...result.data]))
        .catch(err => console.log(err));
    }
  }, [currentPage, coursesPerPage, selectedTag, sortBy]);

  useEffect(() => {
    // 檢查 URL 中是否有 tag 參數
    const { tag } = router.query;
    if (tag) {
      setSelectedTag(decodeURIComponent(tag));
    }
  }, [router.query]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // 頁面變化時，會觸發 useEffect 重新獲取數據
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
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
  
    return (
      <div className={scss.pagination}>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={number === currentPage ? scss.activePage : ''}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };


  return (
    <>
      <Head>
        <title>課程列表 | Fundodo</title>
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
          selectedTag={selectedTag}
          setSelectedTag={handleTagChange}
          tags={tags} />
        <CourseGrid courses={displayedCourses} />

        <div className={scss.pagination}>
        {renderPagination()}
          </div>
      </div>


    </>
  )
}
Course.layout = DefaultLayout;
