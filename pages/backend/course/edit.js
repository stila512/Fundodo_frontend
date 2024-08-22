import React from 'react';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend'
import scss from './edit.module.scss';

export default function CourseEdit() {
  return (
    <>
      <Head>
        <title>後台管理-編輯課程</title>
      </Head>
      <BackendLayout>
        <div className="container">
          <h1 className={scss.title}>編輯課程</h1>
          <form>
            <div className={scss.inputBody}>
              <div className={scss.contentWrapper}>
                <div className={scss.formGroup}>
                  <label htmlFor="title">課程名稱</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                  />
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="summary">課程簡介</label>
                  <textarea
                    id="summary"
                    name="summary"
                    required
                  ></textarea>
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="description">課程描述</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                  ></textarea>
                </div>

                <div className={scss.formGroup}>
                  <label>課程分類</label>
                  <div className={scss.categoryGroup}>
                    <label className={scss.categoryLabel}>
                      <input
                        type="checkbox"
                      />
                      Test
                    </label>
                  </div>
                </div>

                <div className={scss.formGroupImg}>
                  <div className={scss.uploadImg}>
                    <label htmlFor="coverImage">課程封面圖片</label>
                    <input
                      type="file"
                      id="coverImage"
                      name="coverImage"
                      accept="image/*"
                    />
                  </div>
                  <div className={scss.imagePreview}>
                    <img src="/placeholder-image.jpg" alt="Preview" />
                  </div>
                </div>

                <div className={scss.chapterSection}>
                  <div className={scss.chapterInfo}>
                    <h3>章節 1</h3>
                    <input
                      type="text"
                      placeholder="章節名稱"
                    />
                  </div>

                  <div className={scss.lessonsContainer}>
                    <div className={scss.lessonSection}>
                      <input
                        type="text"
                        placeholder="單元名稱"
                      />
                      <input
                        type="text"
                        placeholder="單元時長"
                      />
                      <input
                        type="file"
                        accept="video/*"
                      />
                    </div>
                    <button type="button" className={scss.addButton}>新增單元</button>
                  </div>
                </div>

                <div className={scss.addChapterContainer}>
                  <button type="button" className={scss.addButton}>新增章節</button>
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="originalPrice">原價</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="original_price"
                    required
                  />
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="salePrice">優惠價</label>
                  <input
                    type="number"
                    id="salePrice"
                    name="sale_price"
                    required
                  />
                </div>

                <div className={scss.buttonGroup}>
                  <button type="button" className={scss.cancelButton}>取消</button>
                  <button type="submit" className={scss.submitButton}>
                    更新課程
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </BackendLayout>
    </>
  );
}