import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { AiOutlineUser } from "react-icons/ai";
import scss from './detailBanner.module.scss';
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';

export default function DetailBanner({}) {
  const router = useRouter();
  const [course, setCourse] = useState({
    id: 0,
    title: "",
    summary: "",
    description: "",
    img_path: "",
    price: 0,
    viewed_count: ""
  });

  const getCourse = async (id) => { 
    const apiURL = `http://localhost:3005/api/course/detail/${id}`
    const res = await fetch(apiURL)
    const data = await res.json()

    // console.log(data)
    setCourse(data.data)
  }
  // console.log(router.query)

  useEffect(() => {
    if(router.isReady && router.query.id){
      getCourse(router.query.id)
    }
    
  }, [router.isReady])


  return (
    <>
      <div className={[scss.banner, "d-flex gap-md-5"].join(" ")}>
        <div className="col-12 col-md-6">
          <Image src={`/coursePic/${course.img_path}`} className={scss.crsPic} width={400} height={300} alt='課程圖片'/>
        </div>
        <div className={[scss.info, "col-12", "col-md-5"].join(' ')}>
          <h2>{course.title}</h2>
          <div className={scss.text}>
            <div className={scss.tags}>
              <p>感情增溫</p>
            </div>
            <div className='d-flex gap-1 ai-center'>
              <AiOutlineUser />
              <p>{course.viewed_count} 人來學習</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
