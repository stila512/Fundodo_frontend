import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend'
import Modal from '@/components/common/modal';
import scss from './create.module.scss';
import { MdAddTask } from "react-icons/md";

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
    sale_price: '',
    outline_images: []
  });
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [outlineImagePreviews, setOutlineImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/course/tags');
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setTags(data.data);
      } else {
        console.error('分類格式錯誤', data);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, fetchTags: '無法獲取課程分類，請稍後再試' }));
    }
  };


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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse(prev => ({ ...prev, img_path: file }));
      const reader = new FileReader();  //FileReader 是一個 Web API，用於以非同步方式讀取文件的內容。
      reader.onloadend = () => {   //onloadend 是 FileReader 的一個事件，當讀取操作完成時（無論成功或失敗）都會觸發。
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOutlineImagesUpload = (e) => {
    const files = Array.from(e.target.files);  // 將 FileList 轉換為一個數組
    if (files.length > 0) {
      setCourse(prev => ({
        ...prev,
        outline_images: [...prev.outline_images, ...files]
      }));

      const newPreviews = files.map(file => URL.createObjectURL(file)); //為每個文件創建一個內存 URL
      setOutlineImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeOutlineImage = (index) => {
    setCourse(prev => ({
      ...prev,
      outline_images: prev.outline_images.filter((_, i) => i !== index)  //filter 方法創建一個新數組，排除指定索引的圖片
    }));
    setOutlineImagePreviews(prev => {
      const newPreviews = [...prev];  //創建預覽數組的淺拷貝
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleVideoUpload = (chapterIndex, lessonIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      handleLessonChange(chapterIndex, lessonIndex, 'video_path', file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagId) => {
    setCourse(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const setTestData = () => {
    const sample = {
      title: '愛犬心理學：解讀狗狗的內心世界',
      summary: '探索狗狗的思維方式，學習如何更好地理解和溝通with你的毛孩。本課程將幫助你建立更深厚的人狗關係。',
      description: `• 狗狗的基本情緒表達方式
• 如何識別和回應狗狗的壓力信號
• 狗狗社交行為的解讀技巧
• 建立信任和加強溝通的方法
• 如何通過理解來改善行為問題`,
      tags: ['2', '3', '6'],
      chapters: [
        {
          name: '狗狗的情緒世界',
          lessons: [
            { name: '認識狗狗的六大基本情緒', duration: '15' },
            { name: '狗狗的身體語言解讀', duration: '20' },
            { name: '壓力信號識別與應對', duration: '12' }
          ]
        }
      ],
      original_price: '1200',
      sale_price: '1000'
    };

    setCourse(prevCourse => ({
      ...prevCourse,
      ...sample
    }));
  };

  const validateForm = (course) => {
    const errors = [];

    if (!course.title?.trim()) errors.push('請輸入課程名稱');
    if (!course.summary?.trim()) errors.push('請輸入課程簡介');
    if (!course.description?.trim()) errors.push('請輸入課程描述');
    if (course.tags.length === 0) errors.push('請選擇至少一個課程分類');
    if (!course.img_path) errors.push('請上傳課程封面圖片');
    if (course.outline_images.length === 0) {
      errors.push('請上傳至少一張課程大綱圖片');
    }

    course.chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.name?.trim()) {
        errors.push("請輸入章節名稱");
      }
      if (chapter.lessons.length === 0) {
        errors.push("請至少添加一個課程單元");
      } else {
        chapter.lessons.forEach((lesson, lessonIndex) => {
          if (!lesson.name?.trim()) {
            errors.push("請輸入單元名稱");
          }
          if (!lesson.duration?.trim()) {
            errors.push("請輸入單元時間");
          } else if (isNaN(parseFloat(lesson.duration))) {
            errors.push("單元時間必須是數字");
          }
          if (!lesson.video_path) {
            errors.push("請上傳課程單元影片");
          }
        });
      }
    });

    if (!course.original_price) {
      errors.push('請輸入原價');
    } else if (isNaN(parseFloat(course.original_price))) {
      errors.push('原價必須是數字');
    }

    if (!course.sale_price) {
      errors.push('請輸入優惠價');
    } else if (isNaN(parseFloat(course.sale_price))) {
      errors.push('優惠價必須是數字');
    } else if (parseFloat(course.sale_price) > parseFloat(course.original_price)) {
      errors.push('優惠價不能高於原價');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(course);

    if (validationErrors.length > 0) {
      setModalContent({
        title: '新增失敗',
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

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', course.title);
      formData.append('summary', course.summary);
      formData.append('description', course.description);

      // 確保 tags 是一個數組並且只包含數字
      const tagIds = course.tags.map(tag => Number(tag)).filter(id => !isNaN(id));
      formData.append('tags', JSON.stringify(tagIds));

      formData.append('original_price', course.original_price);
      formData.append('sale_price', course.sale_price);

      if (course.img_path) {
        formData.append('img_path', course.img_path);
      }

      const chaptersData = course.chapters.map(chapter => ({
        name: chapter.name,
        lessons: chapter.lessons.map(lesson => ({
          name: lesson.name,
          duration: lesson.duration
        }))
      }));
      formData.append('chapters', JSON.stringify(chaptersData));

      // 上傳課程大綱圖片
      course.outline_images.forEach((image, index) => {
        formData.append('outline_images', image);
      });

      course.chapters.forEach((chapter, chapterIndex) => {
        chapter.lessons.forEach((lesson, lessonIndex) => {
          if (lesson.video_path instanceof File) {
            formData.append('videos', lesson.video_path);
          }
        });
      });

      console.log("Sending tags:", JSON.stringify(tagIds));

      const res = await fetch('http://localhost:3005/api/course', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '課程新增失敗');
      }

      const result = await res.json();
      setModalContent({
        title: '成功',
        message: '課程新增成功'
      });
      setShowModal(true);
      setTimeout(() => router.push('/backend/course'), 1000);
    } catch (error) {
      console.error('課程新增失敗:', error);
      setModalContent({
        title: '失敗',
        message: error.message || '課程新增失敗，請稍後再試。'
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>新增課程 | Fundodo 後台</title>
      </Head>
      <BackendLayout>
        <div className="container">
          <h1 className={scss.title}>新增課程</h1>
          {errors.submit && <div className={scss.error}>{errors.submit}</div>}
          <button onClick={setTestData} className={scss.testbtn}><MdAddTask /></button>
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
                  {errors.summary && <div className={scss.error}>{errors.summary}</div>}
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="description">課程描述</label>
                  <textarea
                    id="description"
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && <div className={scss.error}>{errors.description}</div>}
                </div>

                <div className={scss.formGroup}>
                  <label>課程分類</label>
                  <div className={scss.categoryGroup}>
                    {tags.map(tag => (
                      <label key={tag.id} className={scss.categoryLabel}>
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
                    {outlineImagePreviews.map((preview, index) => (
                      <div key={index} className={scss.imagePreviewItem}>
                        <img src={preview} alt={`大綱圖片 ${index + 1} `} />
                        <button type="button" onClick={() => removeOutlineImage(index)}>刪除</button>
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
                    type="text"
                    id="originalPrice"
                    name="original_price"
                    className={scss.priceInput}
                    value={course.original_price}
                    onChange={handleInputChange}
                  />
                  {errors.original_price && <div className={scss.error}>{errors.original_price}</div>}
                </div>

                <div className={scss.formGroup}>
                  <label htmlFor="salePrice">優惠價</label>
                  <input
                    type="text"
                    id="salePrice"
                    name="sale_price"
                    className={scss.priceInput}
                    value={course.sale_price}
                    onChange={handleInputChange}
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
        <Modal
          mode={1}
          active={showModal}
          onClose={() => setShowModal(false)}
        >
          <h4>{modalContent.title}</h4>
          {typeof modalContent.message === 'string'
            ? <p>{modalContent.message}</p>
            : modalContent.message
          }
        </Modal>
      </BackendLayout>
    </>
  );
}