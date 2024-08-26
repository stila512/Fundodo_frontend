import React from 'react'
import scss from "./courseGrid.module.scss"
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';

export default function CourseGrid({ courses }) {


    return (
        <>
            <div className={scss.cardWrapper}>
                {courses.map((v) => {
                    return (
                        <div className='col-6 col-lg-4'>
                            <div key={v.id} className={scss.card}>
                                <Link href={`/course/detail/${v.id}`} >
                                    <div className={scss.crsPic}>
                                        <Image
                                            src={`http://localhost:3005${v.img_path}`}
                                            alt={v.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className={scss.courseImage}
                                        />
                                    </div>
                                    <div className={scss.cardBody}>
                                        <h3>{v.title}</h3>
                                        <div className='d-flex gap-1 ai-center'>
                                            <AiOutlineUser /> <p>{v.viewed_count} 人來學習</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}
