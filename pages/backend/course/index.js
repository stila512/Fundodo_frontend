import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import scss from './index.module.scss';
import { CiRead } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";


// 待調整: style/search/sortby/pagination
export default function CourseList() {
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/course');
      const data = await res.json();
      setCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
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
            <button className={scss.addBtn}>新增課程</button>
            <div className={scss.searchBar}>
              <input type="text" className={scss.searchInput} placeholder="搜尋..." />
              <button className={scss.searchBtn}> <CiRead />  </button>
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
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.tags.join(', ')}</td>
                  <td>NT${course.sale_price}</td>
                  <td>{new Date(course.created_at).toLocaleDateString()}</td>
                  <td className={scss.actionBtns}>
                    <button className={scss.actionBtn}> <CiRead /> </button>
                    <button className={scss.actionBtn}> <FaEdit /> </button>
                    <button className={scss.actionBtn}> <RiDeleteBin5Line /> </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BackendLayout>
    </>
  )
}
