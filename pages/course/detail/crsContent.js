import React from 'react'
import scss from './crsContent.module.scss';
import Link from 'next/link';
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function CrsContent({ chapters, lessons,img_path }) {
  return (
    <>

      <div className={scss.title}>
        <h3 >課程內容</h3>
      </div>
      {chapters.map((chapter) => {
        return (
          <>
            <div className={scss.chapter} key={chapter.id}>
              <h3>{chapter.name}</h3>
              {/* <Link href="">全部展開 <MdOutlineArrowForwardIos /> </Link> */}
            </div>
            <div className={scss.lessons}>
              {chapter.lessons.map(lesson => (
                <Link href="/" key={lesson.id} className={scss.link}>
                <div className={scss.lesson}>
                  <h2>{lesson.name}</h2>
                  <p>{lesson.duration}min</p>
                </div>
                </Link>
              )
              )}


            </div>
          </>
        )
      }

      )}



    </>
  )
}
