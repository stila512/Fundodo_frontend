import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import Modal from '@/components/common/modal';
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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [courseToDelete, setCourseToDelete] = useState(null);

   // 當搜索或當前頁碼變化時，重新獲取課程列表
  useEffect(() => {
    fetchCourses();
  }, [searchQuery, currentPage]);


  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/course?page=${currentPage}&perPage=${coursesPerPage}&search=${searchQuery}`);
      if (!res.ok) {
        throw new Error(`HTTP error! ${res.status}`);
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
  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setModalContent({
      title: '確認刪除',
      message: '您確定要刪除此課程嗎？'
    });
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    try {
      const res = await fetch(`http://localhost:3005/api/course/delete/${courseToDelete}`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        throw new Error("Failed to delete course");
      }
      setShowModal(false);
      setModalContent({
        title: '刪除成功',
        message: '課程已成功刪除'
      });
      setShowModal(true);
      fetchCourses(); // 重新獲取課程列表
      setTimeout(() => {
        setShowModal(false);
        setCourseToDelete(null);
      }, 1500);
    } catch (err) {
      setModalContent({
        title: '刪除失敗',
        message: '課程刪除失敗，請稍後再試'
      });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCourseToDelete(null);
  };

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

    return (
      <div className={scss.pagination}>
      <ul>
      {pageNumbers.map(number => (
          <li
            key={number}
            className={number === currentPage ? scss.activePage : ''}
          >
          <a href="#" onClick={() => handlePageChange(number)}>
          {number}
          </a>
          </li>
        ))}
      </ul>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>課程列表 | Fundodo 後台</title>
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
                    <td className={scss.tags}>{course.tags && course.tags.length > 0 ? (
                                        course.tags.map((tag, index) => (
                                            <div key={index} className={scss.tag}><p>{tag}</p></div>
                                        ))
                                    ) : (
                                       <p>Loading Courses...</p>
                                    )}</td>
                    <td>NT${course.sale_price}</td>
                    <td>{new Date(course.created_at).toLocaleDateString()}</td>
                    <td className={scss.actionBtns}>
                      <button className={scss.actionBtn} onClick={() => handleRead(course.id)}><CiRead /></button>
                      <button className={scss.actionBtn} onClick={() => handleEdit(course.id)}><FaEdit /></button>
                      <button className={scss.actionBtn} onClick={() => handleDeleteClick(course.id)}><RiDeleteBin5Line /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Loading Courses...</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={scss.pagination}>
            {renderPagination()}
          </div>
        </div>
        <Modal
          mode={2}
          active={showModal}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          onCancel={handleModalClose}
          confirmText="確定刪除"
          cancelText="取消"
        >
          <h4>{modalContent.title}</h4>
          <p>{modalContent.message}</p>
        </Modal>
      </BackendLayout>
    </>
  );
}
