import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import scss from "./courseGrid.module.scss";
import { AiOutlineUser } from "react-icons/ai";


export default function CourseGrid({ courses }) {
  return (
    <>
      <div className={scss.cardWrapper}>
        {courses.map((v) => (
          <div key={v.id} className={scss.cardItem}>
            <div className={scss.card}>
              <div className={scss.crsPic}>
                <Link href={`/course/detail/${v.id}`}>
                  <Image
                    src={`http://localhost:3005/upload/crs_images/${v.img_path}`}
                    alt={v.title}
                    layout="fill"
                    objectFit="cover"
                    className={scss.courseImage}
                  />
                </Link>
              </div>
              <div className={scss.cardBody}>
                <h3>{v.title}</h3>
                <p className={scss.summary}>{v.summary}</p>
                <div className='d-flex gap-1 ai-center'>
                  <AiOutlineUser /> <p>{v.viewed_count} 人來學習</p>
                </div>
              </div>
              <div className="d-flex jc-center my-3">
                <Link href={`/course/detail/${v.id}`}>
                  <button className={scss.button}>立即購買</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}