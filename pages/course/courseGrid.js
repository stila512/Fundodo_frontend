import React, { useEffect, useState } from 'react'
import scss from "./courseGrid.module.scss"
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';

export default function CourseGrid({ selectedCate }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const apiUrl = selectedCate ? `http://localhost:3005/api/course/category/${selectedCate}`
                : "http://localhost:3005/api/course";

            try {
                const res = await fetch(apiUrl)
                const result = await res.json()
                setCourses(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCourses();
    }, [selectedCate])


    return (
        <>
            <div className={["row ", scss.crsWrapper].join(" ")}>
                {courses.map((v) => {
                    return (
                        <div key={v.id} className={["col-6 col-lg-4", scss.cards].join(" ")}>
                            <div className={scss.card}>
                                <Link href={`/course/detail/${v.id}`}>
                                    <div className={scss.crsPic}>
                                        <Image src={`/coursePic/${v.img_path}`} layout='fill' objectFit='cover' alt='課程圖片' />
                                    </div>
                                    <div className={scss.cardText}>
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
