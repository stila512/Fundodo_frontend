import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import scss from './index.module.scss';
import { CiRead } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CourseList() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 10;

  useEffect(() => {
    fetchCourses();
  }, [searchQuery, currentPage]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/course?page=${currentPage}&search=${searchQuery}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.status === "success") {
        setCourses(data.data || []);
        setTotalPages(Math.ceil(data.totalCourses / data.coursesPerPage));
      } else {
        console.error('Failed to fetch courses:', data.message);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreate = () => {
    router.push('/backend/course/create')
  }

  const handleRead = (courseId) => {
    router.push(`/backend/course/detail/${courseId}`)
  }

  const handleEdit = (courseId) => {
    router.push(`/backend/course/edit/${courseId}`)
  }

  const handleDelete = (courseId) => async () => {
    if (window.confirm("確定要刪除此課程嗎?")) {
      try {
        const res = await fetch(`http://localhost:3005/api/course/delete/${courseId}`, {
          method: 'PATCH'
        });
        if (res.ok) {
          fetchCourses();
        } else {
          alert("刪除課程失敗");
        }
      } catch (err) {
        console.error("刪除課程失敗:", err);
      }
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

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
        <title>Fundodo後台 - 課程管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <BackendLayout>
        <div className={scss.coursePage}>
          <h1>課程列表</h1>
          <div className={scss.topBar}>
            <button className={scss.addBtn} onClick={handleCreate}>新增課程</button>
            <div className={scss.searchBar}>
              <input 
                type="text" 
                className={scss.searchInput} 
                placeholder="搜尋課程名稱..." 
                value={searchQuery}
                onChange={handleSearchChange} 
              />
              <button className={scss.searchBtn}><CiRead /></button>
            </div>
          </div>
          <table className={scss.courseTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>課程名稱</th>
                <th>分類</th>
                <th>價格</th>
                <th>建立日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{Array.isArray(course.tags) ? course.tags.join(', ') : course.tags}</td>
                    <td>NT${course.sale_price}</td>
                    <td>{new Date(course.created_at).toLocaleDateString()}</td>
                    <td className={scss.actionBtns}>
                      <button className={scss.actionBtn} onClick={() => handleRead(course.id)}><CiRead /></button>
                      <button className={scss.actionBtn} onClick={() => handleEdit(course.id)}><FaEdit /></button>
                      <button className={scss.actionBtn} onClick={handleDelete(course.id)}><RiDeleteBin5Line /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No courses available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={scss.pagination}>
            {renderPagination()}
          </div>
        </div>
      </BackendLayout>
    </>
  );
}
