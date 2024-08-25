import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend';
import { FaEdit, FaTrashAlt, FaFile } from 'react-icons/fa';
import scss from './detail.module.scss';
import { format, parseISO } from 'date-fns';

export default function CourseDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [course, setCourse] = useState(null);

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    const formatDateTime = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd HH:mm:ss');
    };

    useEffect(() => {
        if (id) {
            fetchCourseDetail(id)
        }
    }, [id]);

    const fetchCourseDetail = async (courseId) => {
        try {
            const res = await fetch(`http://localhost:3005/api/course/${courseId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch course details");
            }
            const data = await res.json();
            const courseData = {
                ...data.data,
                imgPath: data.imgPath,
                tags: data.data.tags || []
            };
            setCourse(courseData);
        } catch (err) {
            console.error("Failed fetching course details", err);
            // 可以在這裡設置一個錯誤狀態
        }
    }

    const handleEdit = () => {
        router.push(`/backend/course/edit/${id}`);
    }

    const handleDelete = async () => {
        if (window.confirm('確定要刪除此課程嗎?')) {
            try {
                const res = await fetch(`http://localhost:3005/api/course/delete/${id}`, {
                    method: 'PATCH',
                });
                if (!res.ok) {
                    throw new Error("Failed to delete course");
                }
                alert("課程刪除成功!")
                router.push('/backend/course');
            } catch (err) {
                alert("課程刪除失敗", err);
            }
        }
    }

    if (!course) return null;

    return (
        <>
            <Head>
                <title>後台管理-課程詳情</title>
            </Head>
            <BackendLayout>
                <div className={scss.courseDetail}>
                    <h1 className={scss.title}>課程詳情</h1>
                    <div className={scss.actions}>
                        <button className={scss.editButton} onClick={handleEdit}><FaEdit /> 編輯課程</button>
                        <button className={scss.deleteButton} onClick={handleDelete}><FaTrashAlt /> 刪除課程</button>
                    </div>
                    <div className={scss.content}>
                        <div className={scss.mainInfo}>
                            <img src={`http://localhost:3005/upload/crs_images/${course.img_path}`} alt="課程封面" className={scss.coverImage} />
                            <div className={scss.info}>
                                <h2>{course.title}</h2>
                                <p className={scss.summary}>{course.summary}</p>
                                <div className={scss.tags}>
                                    {course.tags && course.tags.length > 0 ? (
                                        course.tags.map((tag, index) => (
                                            <div key={index} className={scss.tag}><p>{tag}</p></div>
                                        ))
                                    ) : (
                                        <p>No tags available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={scss.section}>
                            <h3>課程價格</h3>
                            <p><strong>原價: </strong>$ {course.original_price}</p>
                            <p><strong>優惠價: </strong>$ {course.sale_price}</p>
                        </div>

                        <div className={scss.section}>
                            <h3>課程資訊</h3>
                            <p><strong>創建日期: </strong>{formatDate(course.created_at)}</p>
                            {course.updated_at && (
                                <p>最後更新：{formatDateTime(course.updated_at)}</p>
                            )}
                        </div>

                        <div className={scss.section}>
                            <h3>課程描述</h3>
                            <p>{course.description}</p>
                        </div>

                        <div className={scss.section}>
                            <h3>課程大綱</h3>
                            {course.chapters.map((chapter, chapterIndex) => (
                                <div key={chapter.id} className={scss.chapter}>
                                    <h4>章節 {chapterIndex + 1}: {chapter.name}</h4>
                                    <ul>
                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                            <li key={lesson.id}>
                                                <span>{chapterIndex + 1}.{lessonIndex + 1} {lesson.name}</span>
                                                <span>時長: {lesson.duration}分鐘</span>
                                                <span className={scss.filename}><FaFile /> {lesson.video_path}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BackendLayout>
        </>
    );
}