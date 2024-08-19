import React, { useState } from 'react'
import BackendLayout from '@/components/layout/backend'
import scss from './edit.module.scss';

export default function CourseEdit() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裡處理表單提交邏輯
    console.log('Submitting course:', course);
  };
  return (
    <>
      <BackendLayout>
          <div className={scss.content}>
            <h1>編輯課程</h1>
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
    </>
  )
}
