import React, { useEffect, useState } from 'react'
import scss from "./courseGrid.module.scss"
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';
import { padStart } from 'lodash';

export default function CourseGrid() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/api/course")
            .then(res => res.json())
            .then(result => setCourses(result.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <>
            <div className="row">
                {courses.map((v) => {
                    return (
                        <div key={v.id} className={["col-6 col-lg-4", scss.cards].join(" ")}>
                            <div className={scss.card}>
                                <Link href={`/course/detail/${v.id}`}>
                                    <div className={scss.crsPic}>
                                        <Image src={`/coursePic/${v.img_path}`} layout='fill' objectFit='cover' />
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
