import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend';
import scss from './edit.module.scss';

export default function CourseEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState({
    title: '',
    summary: '',
    description: '',
    img_path: '',
    original_price: '',
    sale_price: '',
    tag_ids: [],
    chapters: [],
    images: []
  });
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (id) {
      fetchCourse();
      fetchTags();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/course/${id}`);
      const data = await res.json();
      console.log('獲取的課程資料:', data);
      setCourse(data.data);
      if (data.data.img_path) {
        setPreviewImage(getImageUrl(data.data.img_path));
      }
    } catch (error) {
      console.error('獲取課程資料失敗:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/course/tags');
      const data = await res.json();
      setTags(data.data);
    } catch (error) {
      console.error('獲取標籤失敗:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value, 10);
    if (checked) {
      setCourse(prev => ({ ...prev, tag_ids: [...prev.tag_ids, tagId] }));
    } else {
      setCourse(prev => ({ ...prev, tag_ids: prev.tag_ids.filter(id => id !== tagId) }));
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http')) {
      return imgPath;
    }
    return `http://localhost:3005/upload/crs_images/${imgPath}`;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse(prev => ({ ...prev, img_path: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...course.chapters];
    updatedChapters[index][field] = value;
    setCourse(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const handleLessonChange = (chapterIndex, lessonIndex, field, value) => {
    const updatedChapters = [...course.chapters];
    if (field === 'video_path' && value instanceof File) {
      updatedChapters[chapterIndex].lessons[lessonIndex][field] = value;
    } else {
      updatedChapters[chapterIndex].lessons[lessonIndex][field] = value;
    }
    setCourse(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('summary', course.summary);
    formData.append('description', course.description);
    formData.append('tag_ids', JSON.stringify(course.tag_ids));
    formData.append('original_price', course.original_price);
    formData.append('sale_price', course.sale_price);
    if (course.img_path instanceof File) {
      formData.append('img_path', course.img_path);
    }

    const chaptersData = course.chapters.map(chapter => ({
      name: chapter.name,
      lessons: chapter.lessons.map(lesson => ({
        name: lesson.name,
        duration: lesson.duration,
        video_path: lesson.video_path instanceof File ? lesson.video_path.name : lesson.video_path
      }))
    }));
    formData.append('chapters', JSON.stringify(chaptersData));

      // 處理影片文件
    course.chapters.forEach((chapter, chapterIndex) => {
      chapter.lessons.forEach((lesson, lessonIndex) => {
        if (lesson.video_path instanceof File) {
          formData.append('video_path', lesson.video_path, `video_${chapterIndex}_${lessonIndex}_${lesson.video_path.name}`);
        }
      });
    });

    try {
      const res = await fetch(`http://localhost:3005/api/course/${id}`, {
        method: 'PATCH',
        body: formData
      });

      if (!res.ok) {
        throw new Error('更新課程失敗');
      }

      const data = await res.json();
      alert('課程更新成功！');
      router.push('/backend/course');
    } catch (error) {
      console.error('更新課程失敗:', error);
    }
  };

  return (
    <>
      <Head>
        <title>後台管理-編輯課程</title>
      </Head>
      <BackendLayout>
        <div className="container">
          <h1 className={scss.title}>編輯課程</h1>
          <form onSubmit={handleSubmit}>
            <div className={scss.inputBody}>
              <div className={scss.contentWrapper}>
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
                  <label htmlFor="summary">課程簡介</label>
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
                  <label>課程分類</label>
                  <div className={scss.categoryGroup}>
                    {tags.map(tag => (
                      <label key={tag.id} className={scss.categoryLabel}>
                        <input
                          type="checkbox"
                          value={tag.id}
                          checked={course.tag_ids.includes(tag.id)}
                          onChange={handleTagChange}
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={scss.formGroupImg}>
                  <div className={scss.uploadImg}>
                    <label htmlFor="coverImage">課程封面圖片</label>
                    <input
                      type="file"
                      id="coverImage"
                      name="img_path"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className={scss.imagePreview}>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="預覽"
                      />
                    )}
                  </div>
                </div>

                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className={scss.chapterSection}>
                    <div className={scss.chapterInfo}>
                      <h3>章節 {chapterIndex + 1}</h3>
                      <input
                        type="text"
                        value={chapter.name}
                        onChange={(e) => handleChapterChange(chapterIndex, 'name', e.target.value)}
                        placeholder="章節名稱"
                      />
                    </div>

                    <div className={scss.lessonsContainer}>
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className={scss.lessonSection}>
                          <input
                            type="text"
                            value={lesson.name}
                            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'name', e.target.value)}
                            placeholder="單元名稱"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'duration', e.target.value)}
                            placeholder="單元時長"
                          />
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'video_path', e.target.files[0])}
                          />
                          {lesson.video_path && (
                            <p>當前影片: {typeof lesson.video_path === 'string' ? lesson.video_path.split('/').pop() : lesson.video_path.name}</p>
                          )}
                        </div>
                      ))}
                      <button type="button" className={scss.addButton} onClick={() => handleChapterChange(chapterIndex, 'lessons', [...chapter.lessons, { name: '', duration: '', video_path: '' }])}>新增單元</button>
                    </div>
                  </div>
                ))}

                <div className={scss.addChapterContainer}>
                  <button type="button" className={scss.addButton} onClick={() => setCourse(prev => ({ ...prev, chapters: [...prev.chapters, { name: '', lessons: [] }] }))}>新增章節</button>
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="original_price">原價</label>
                  <input
                    type="number"
                    id="original_price"
                    name="original_price"
                    value={course.original_price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="sale_price">優惠價</label>
                  <input
                    type="number"
                    id="sale_price"
                    name="sale_price"
                    value={course.sale_price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={scss.buttonGroup}>
                  <button type="button" className={scss.cancelButton} onClick={() => router.push('/backend/course')}>取消</button>
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