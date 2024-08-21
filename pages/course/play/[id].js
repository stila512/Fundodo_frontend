import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import scss from './play.module.scss';

const VideoPlayer = ({ video_path }) => {
    return (
        <div className={scss.videoWrapper}>
            <video controls className={scss.videoPlayer}>
                <source src={`/course_videos/${video_path}`} type='video/mp4' />
            </video>
        </div>
    );
};

const CourseContent = ({ chapters, onLessonSelect, currentLessonId }) => {
    return (
        <div className={scss.courseContent}>
            {chapters.map((chapter, index) => (
                <div key={chapter.id} className={scss.section}>
                    <h4>Section {index + 1}: {chapter.name}</h4>
                    <p>{chapter.lessons.length} / {chapter.lessons.length} 共    min</p>
                    <div>
                        {chapter.lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`${scss.lesson} ${currentLessonId === lesson.id ? scss.active : ''}`}
                                onClick={() => onLessonSelect(lesson)}
                            >
                                <input type="checkbox" checked={lesson.completed} readOnly />
                                <span>{lesson.name}</span>
                                <span>{lesson.duration}min</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default function CoursePlay() {
    const router = useRouter();
    const [course, setCourse] = useState(
        {
            id: 0,
            title: "",
            summary: "",
            description: "",
            tags: [],
            chapters: [],
        });
    const [currentLesson, setCurrentLesson] = useState(null);


    const getCourse = async (id) => {
        const apiURL = `http://localhost:3005/api/course/${id}`;
        const res = await fetch(apiURL);
        const result = await res.json();
        setCourse(result.data);
        if (result.data.chapters.length > 0 && result.data.chapters[0].lessons.length > 0) {
            setCurrentLesson(result.data.chapters[0].lessons[0]);
        }
    };

    useEffect(() => {
        if (router.isReady && router.query.id) {
            getCourse(router.query.id);
        }
    }, [router.isReady, router.query.id]);

    const handleLessonChange = (lesson) => {
        setCurrentLesson(lesson);
    };

    return (
        <>
            <Head>
                <title>課程播放： {course.title}</title>
            </Head>


            <div className={scss.containerFluid}>
                <div className={["container d-flex", scss.mainContent].join(" ")}>
                    <div className={[scss.videoContent, "col-8"].join(" ")}>
                        <VideoPlayer video_path={currentLesson?.video_path} />
                        <h2>{course.title}</h2>
                    </div>
                    <aside className={[scss.sidebar, "col-4"].join(" ")}>
                        <CourseContent
                            chapters={course.chapters}
                            onLessonSelect={handleLessonChange}
                            currentLessonId={currentLesson?.id}
                        />
                    </aside>
                </div>
            </div>


        </>

    );
}
CoursePlay.layout = DefaultLayout;