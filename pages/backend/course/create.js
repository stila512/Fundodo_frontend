import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend'
import scss from './create.module.scss';

export default function CourseAdd() {
  const router = useRouter();

  const [course, setCourse] = useState({
    title: '',
    summary: '',
    description: '',
    tags: [],
    img_path: null,
    chapters: [{ name: '', lessons: [{ name: '', duration: '', video_path: null }] }],
    original_price: '',
    sale_price: ''
  });

  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/course/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          setTags(data.data);
        } else {
          console.error('Unexpected tag data format:', data);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
        setErrors(prev => ({ ...prev, fetchTags: '無法獲取課程分類，請稍後再試' }));
      }
    };
  
    fetchTags();
  }, []);

  const addChapter = () => {
    setCourse(prev => ({
      ...prev,
      chapters: [...prev.chapters, { name: '', lessons: [{ name: '', duration: '', video_path: null }] }]
    }));
  };

  const addLesson = (chapterIndex) => {
    setCourse(prev => {
      const newChapters = [...prev.chapters];
      newChapters[chapterIndex].lessons.push({ name: '', duration: '', video_path: null });
      return { ...prev, chapters: newChapters };
    });
  };

  const handleChapterChange = (chapterIndex, field, value) => {
    setCourse(prev => {
      const newChapters = [...prev.chapters];
      newChapters[chapterIndex][field] = value;
      return { ...prev, chapters: newChapters };
    });
  };

  const handleLessonChange = (chapterIndex, lessonIndex, field, value) => {
    setCourse(prev => {
      const newChapters = [...prev.chapters];
      newChapters[chapterIndex].lessons[lessonIndex][field] = value;
      return { ...prev, chapters: newChapters };
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCourse(prev => ({ ...prev, img_path: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (chapterIndex, lessonIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading video for chapter ${chapterIndex}, lesson ${lessonIndex}:`, file);
      handleLessonChange(chapterIndex, lessonIndex, 'video_path', file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleTagChange = (tagId) => {
    setCourse(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
    setErrors(prev => ({ ...prev, tags: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!course.title.trim()) newErrors.title = '請輸入課程名稱';
    if (!course.summary.trim()) newErrors.summary = '請輸入課程簡介';
    if (!course.description.trim()) newErrors.description = '請輸入課程描述';
    if (course.tags.length === 0) newErrors.tags = '請選擇至少一個分類';
    if (!course.img_path) newErrors.img_path = '請上傳課程封面圖片';
    if (!course.original_price) newErrors.original_price = '請輸入原價';
    if (!course.sale_price) newErrors.sale_price = '請輸入優惠價';

    course.chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.name.trim()) {
        newErrors[`chapter_${chapterIndex}`] = '請輸入章節名稱';
      }
      chapter.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.name.trim()) {
          newErrors[`lesson_${chapterIndex}_${lessonIndex}`] = '請輸入單元名稱';
        }
        if (!lesson.duration.trim()) {
          newErrors[`lesson_duration_${chapterIndex}_${lessonIndex}`] = '請輸入單元時長';
        }
        if (!lesson.video_path) {
          newErrors[`lesson_video_${chapterIndex}_${lessonIndex}`] = '請上傳單元視頻';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    
    // 添加基本課程信息
    formData.append('title', course.title);
    formData.append('summary', course.summary);
    formData.append('description', course.description);
    formData.append('original_price', course.original_price);
    formData.append('sale_price', course.sale_price);
    
    // 添加標籤
    course.tags.forEach(tag => formData.append('tags[]', tag));
    
    // 添加封面圖片
    if (course.img_path instanceof File) {
      formData.append('img_path', course.img_path);
    }
    
    // 添加章節和課程信息
    course.chapters.forEach((chapter, chapterIndex) => {
      formData.append(`chapters[${chapterIndex}][name]`, chapter.name);
      chapter.lessons.forEach((lesson, lessonIndex) => {
        formData.append(`chapters[${chapterIndex}][lessons][${lessonIndex}][name]`, lesson.name);
        formData.append(`chapters[${chapterIndex}][lessons][${lessonIndex}][duration]`, lesson.duration);
        if (lesson.video_path instanceof File) {
          formData.append(`video_${chapterIndex}_${lessonIndex}`, lesson.video_path, lesson.video_path.name);
        }
      });
    });

    setIsSubmitting(true);
    try {
      console.log('Sending request to server...');
      const response = await fetch('http://localhost:3005/api/course', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '課程創建失敗');
      }

      const result = await response.json();
      console.log('課程創建成功:', result);
      router.push('/backend/course');
    } catch (error) {
      console.error('課程創建失敗:', error);
      setErrors(prev => ({ ...prev, submit: error.message || '創建課程失敗，請稍後再試' }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>後台管理-新增課程</title>
      </Head>
      <BackendLayout>
        <div className="container">
          <h1 className={scss.title}>新增課程</h1>
          {errors.submit && <div className={scss.error}>{errors.submit}</div>}
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
                  {errors.title && <div className={scss.error}>{errors.title}</div>}
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
                  {errors.summary && <div className={scss.error}>{errors.summary}</div>}
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
                  {errors.description && <div className={scss.error}>{errors.description}</div>}
                </div>

                <div className={scss.formGroup}>
                  <label>課程分類</label>
                  <div className={scss.tagGroup}>
                    {tags.map(tag => (
                      <label key={tag.id} className={scss.tagLabel}>
                        <input
                          type="checkbox"
                          checked={course.tags.includes(tag.id.toString())}
                          onChange={() => handleTagChange(tag.id.toString())}
                          name="tags"
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                  {errors.tags && <div className={scss.error}>{errors.tags}</div>}
                </div>

                <div className={scss.formGroupImg}>
                  <div className={scss.uploadImg}>
                    <label htmlFor="img_path">課程封面圖片</label>
                    <input
                      type="file"
                      id="img_path"
                      name="img_path"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </div>
                  {errors.img_path && <div className={scss.error}>{errors.img_path}</div>}
                  {previewImage && (
                    <div className={scss.imagePreview}>
                      <img src={previewImage} alt="Preview" />
                    </div>
                  )}
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
                      {errors[`chapter_${chapterIndex}`] && <div className={scss.error}>{errors[`chapter_${chapterIndex}`]}</div>}
                    </div>

                    <div className={scss.lessonsContainer}>
                      <div>
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className={scss.lessonSection}>
                            <input
                              type="text"
                              value={lesson.name}
                              onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'name', e.target.value)}
                              placeholder="單元名稱"
                            />
                            {errors[`lesson_${chapterIndex}_${lessonIndex}`] && <div className={scss.error}>{errors[`lesson_${chapterIndex}_${lessonIndex}`]}</div>}
                            <input
                              type="text"
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'duration', e.target.value)}
                              placeholder="單元時長"
                            />
                            {errors[`lesson_duration_${chapterIndex}_${lessonIndex}`] && <div className={scss.error}>{errors[`lesson_duration_${chapterIndex}_${lessonIndex}`]}</div>}
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleVideoUpload(chapterIndex, lessonIndex, e)}
                            />
                            {errors[`lesson_video_${chapterIndex}_${lessonIndex}`] && <div className={scss.error}>{errors[`lesson_video_${chapterIndex}_${lessonIndex}`]}</div>}
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => addLesson(chapterIndex)} className={scss.addButton}>新增單元</button>
                    </div>
                  </div>
                ))}

                <div className={scss.addChapterContainer}>
                  <button type="button" onClick={addChapter} className={scss.addButton}>新增章節</button>
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="originalPrice">原價</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="original_price"
                    value={course.original_price}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.original_price && <div className={scss.error}>{errors.original_price}</div>}
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="salePrice">優惠價</label>
                  <input
                    type="number"
                    id="salePrice"
                    name="sale_price"
                    value={course.sale_price}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.sale_price && <div className={scss.error}>{errors.sale_price}</div>}
                </div>

                <div className={scss.buttonGroup}>
                  <button type="button" className={scss.cancelButton} onClick={() => router.back()}>取消</button>
                  <button type="submit" className={scss.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? '提交中...' : '儲存課程'}
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