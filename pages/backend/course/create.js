import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BackendLayout from '@/components/layout/backend'
import scss from './create.module.scss';

export default function CourseAdd() {
  const router = useRouter();
  const [course, setCourse] = useState({
    title: '',
    summary: '',
    description: '',
    originalPrice: '',
    salePrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 這裡處理表單提交邏輯
    console.log('Adding new course:', course);
    
    // 模擬 API 調用
    // const response = await fetch('/api/courses', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(course)
    // });
    
    // if (response.ok) {
    //   router.push('/courses');
    // }
    
    // 暫時直接導航回課程列表頁面
    router.push('/courses');
  };

  return (
    <BackendLayout>
      <div className={scss.addContent}>
            <h1>新增課程</h1>
            <form onSubmit={handleSubmit}>
              <div className={scss.formGroup}>
                <label htmlFor="title">課程名稱</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={course.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={scss.formGroup}>
                <label htmlFor="summary">課程摘要</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={course.summary}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className={scss.formGroup}>
                <label htmlFor="description">課程描述</label>
                <textarea
                  id="description"
                  name="description"
                  value={course.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className={scss.formGroup}>
                <label htmlFor="originalPrice">原價</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={course.originalPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={scss.formGroup}>
                <label htmlFor="salePrice">優惠價</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={course.salePrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={scss.buttonGroup}>
                <button type="button" className={scss.cancel}>取消</button>
                <button type="submit" className={scss.save}>儲存</button>
              </div>
            </form>
          </div>
    </BackendLayout>
  );
}