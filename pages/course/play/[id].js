import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import NoPermissionPage from './nopermission';
import scss from './play.module.scss';
import { AuthContext } from '@/context/AuthContext';
import tokenDecoder from '@/context/token-decoder';
import Breadcrumb from '../breadCrumb';


const VideoPlayer = ({ video_path }) => {
  console.log('Video path:', video_path);
  if (!video_path) {
    return <div>No video available</div>;
  }
  return (
    <div className={scss.videoWrapper}>
      <video key={video_path} controls className={scss.videoPlayer}>
        <source src={`http://localhost:3005${video_path}`} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const CourseContent = ({ chapters, onLessonSelect, currentLessonId }) => {
  return (
    <div className={scss.courseContent}>
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className={scss.section}>
          <h4>Chapter {index + 1}: {chapter.name}</h4>
          <div>
            {chapter.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`${scss.lesson} ${currentLessonId === lesson.id ? scss.active : ''}`}
                onClick={() => onLessonSelect(lesson)}
              >

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
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const { user } = useContext(AuthContext);

  const checkPermission = async (courseId) => {
    try {
      const { userId } = tokenDecoder();
      if (!userId) {
        throw new Error('User not logged in');
      }

      const res = await fetch(`http://localhost:3005/api/course/permission?courseId=${courseId}&userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      return data.status === 'success' && data.hasPurchased;
    } catch (error) {
      console.error('Error checking course permission:', error);
      return false;
    }
  };



  const getCourse = async (id) => {
    try {
      const apiURL = `http://localhost:3005/api/course/${id}`;
      const res = await fetch(apiURL);
      const result = await res.json();
      return result.data;
    } catch (error) {
      console.error('Failed to fetch course:', error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCourseAndCheckPermission = async () => {
      if (router.isReady && router.query.id) {
        const [courseData, permissionStatus] = await Promise.all([
          getCourse(router.query.id),
          checkPermission(router.query.id)
        ]);

        if (isMounted) {
          setCourse(courseData);
          setHasPermission(permissionStatus);

          if (courseData && courseData.chapters.length > 0 && courseData.chapters[0].lessons.length > 0) {
            setCurrentLesson(courseData.chapters[0].lessons[0]);
          }
        }
      }
    };

    loadCourseAndCheckPermission();

    return () => {
      isMounted = false;
    };
  }, [router.isReady, router.query.id, user]);

  const handleLessonChange = (lesson) => {
    setCurrentLesson(lesson);
  };

  if (hasPermission === null || !course) {
    return null;
  }

  if (hasPermission === false) {
    return <NoPermissionPage courseId={router.query.id} />;
  }
  return (
    <>
      <Head>
        <title>{`課程播放： ${course.title}`} | Fundodo </title>
      </Head>

      <div className={scss.container}>
        <div className='container p-0'>
          <div className="">
            <Breadcrumb />
          </div></div>

        <div className={["container d-flex ", scss.mainContent].join(" ")}>
          <div className={[scss.videoContent, "col-8"].join(" ")}>
            {currentLesson && <VideoPlayer video_path={currentLesson.video_path} />}
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