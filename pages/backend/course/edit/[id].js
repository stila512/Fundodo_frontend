import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend';
import Modal from '@/components/common/modal';
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
    outline_images: []
  });
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [outlineImagePreviews, setOutlineImagePreviews] = useState([]);
  const [existingOutlineImages, setExistingOutlineImages] = useState([]);
  const [newOutlineImages, setNewOutlineImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [errors, setErrors] = useState({});

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

      setCourse(data.data);

      if (data.data.img_path) {
        setPreviewImage(getImageUrl(data.data.img_path));
      }
  
      // 確保 outline_images 或 images 是一個數組
      const safeOutlineImages = Array.isArray(data.data.outline_images) 
        ? data.data.outline_images 
        : Array.isArray(data.data.images) 
          ? data.data.images 
          : [];
  
      // 設置已存在的大綱圖片
      setExistingOutlineImages(safeOutlineImages.map(img => ({
        url: getImageUrl(img),
        name: img
      })));
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
    setErrors(prev => ({ ...prev, [name]: '' }));
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
    return imgPath.startsWith('http')
      ? imgPath
      : `http://localhost:3005/upload/crs_images/${imgPath}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse(prev => ({ ...prev, img_path: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleOutlineImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setNewOutlineImages(prev => [...prev, ...newImages]);
    }
  };

  const removeExistingOutlineImage = (index) => {
    setExistingOutlineImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewOutlineImage = (index) => {
    setNewOutlineImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
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
      updatedChapters[chapterIndex].lessons[lessonIndex][field] = value || updatedChapters[chapterIndex].lessons[lessonIndex][field];
    }
    setCourse(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const validateForm = (course) => {
    const errors = [];

    if (!course.title?.trim()) errors.push('請輸入課程名稱');
    if (!course.summary?.trim()) errors.push('請輸入課程簡介');
    if (!course.description?.trim()) errors.push('請輸入課程描述');
    if (course.tags.length === 0) errors.push('請選擇至少一個課程分類');
    const totalOutlineImages = existingOutlineImages.length + newOutlineImages.length;
    if (totalOutlineImages === 0) {
      errors.push('請上傳至少一張課程大綱圖片');
    } else if (totalOutlineImages > 10) {
      errors.push('課程大綱圖片不能超過10張');
    }

    course.chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.name?.trim()) errors.push("請輸入章節名稱");
      if (chapter.lessons.length === 0) errors.push("請至少添加一個課程單元");
      else {
        chapter.lessons.forEach((lesson, lessonIndex) => {
          if (!lesson.name?.trim()) errors.push("請輸入單元名稱");
          if (!lesson.duration?.trim()) errors.push("請輸入單元時間");
          else if (isNaN(parseFloat(lesson.duration))) errors.push("單元時長必須是數字");
        });
      }
    });

    if (!course.original_price) errors.push('請輸入原價');
    else if (isNaN(parseFloat(course.original_price))) errors.push('原價必須是數字');

    if (!course.sale_price) errors.push('請輸入優惠價');
    else if (isNaN(parseFloat(course.sale_price))) errors.push('優惠價必須是數字');
    else if (parseFloat(course.sale_price) > parseFloat(course.original_price)) errors.push('優惠價不能高於原價');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(course);

    if (validationErrors.length > 0) {
      setModalContent({
        title: '更新失敗',
        message: (
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )
      });
      setShowModal(true);
      return;
    }

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

    formData.append('existing_outline_images', JSON.stringify(existingOutlineImages.map(img => img.name)));

    // 添加新上傳的圖片
    newOutlineImages.forEach(img => {
      formData.append('outline_images', img.file);
    });

    const chaptersData = course.chapters.map(chapter => ({
      name: chapter.name,
      lessons: chapter.lessons.map(lesson => ({
        name: lesson.name,
        duration: lesson.duration,
        video_path: lesson.video_path instanceof File ? lesson.video_path.name : lesson.video_path
      }))
    }));
    formData.append('chapters', JSON.stringify(chaptersData));

    course.chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        if (lesson.video_path instanceof File) {
          formData.append('videos', lesson.video_path);
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
      setModalContent({
        title: '成功',
        message: '課程更新成功'
      });
      setShowModal(true);
      setTimeout(() => router.push('/backend/course'), 1000);
    } catch (error) {
      setModalContent({
        title: '失敗',
        message: '課程更新失敗，請稍後再試。'
      });
      setShowModal(true);
    }
  };

  return (
    <>
      <Head>
        <title>編輯課程 | Fundodo 後台</title>
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
                  ></textarea>
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="description">課程描述</label>
                  <textarea
                    id="description"
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
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

                <div className={scss.formGroupImg}>
                  <div className={scss.uploadImg}>
                    <label htmlFor="outline_images">課程大綱圖片（可多選）</label>
                    <input
                      type="file"
                      id="outline_images"
                      name="outline_images"
                      onChange={handleOutlineImagesUpload}
                      accept="image/*"
                      multiple
                    />
                  </div>
                  <div className={scss.imagePreviewContainer}>
                {existingOutlineImages.map((img, index) => (
                  <div key={`existing-${index}`} className={scss.imagePreviewItem}>
                    <img src={img.url} alt={`既有大綱圖片 ${index + 1}`} />
                    <button type="button" onClick={() => removeExistingOutlineImage(index)}>刪除</button>
                  </div>
                ))}
                {newOutlineImages.map((img, index) => (
                  <div key={`new-${index}`} className={scss.imagePreviewItem}>
                    <img src={img.url} alt={`新大綱圖片 ${index + 1}`} />
                    <button type="button" onClick={() => removeNewOutlineImage(index)}>刪除</button>
                  </div>
                ))}
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
                    type="text"
                    id="original_price"
                    name="original_price"
                    className={scss.priceInput}
                    value={course.original_price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="sale_price">優惠價</label>
                  <input
                    type="text"
                    id="sale_price"
                    name="sale_price"
                    className={scss.priceInput}
                    value={course.sale_price}
                    onChange={handleInputChange}
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
        <Modal
          mode={1}
          active={showModal}
          onClose={() => setShowModal(false)}
        >
          <h4>{modalContent.title}</h4>
          <p>{modalContent.message}</p>
        </Modal>
      </BackendLayout>
    </>
  );
}
