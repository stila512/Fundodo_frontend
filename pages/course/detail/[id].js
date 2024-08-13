import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import scss from './index.module.scss';
import DetailBanner from './detailBanner';
import LinkBar from './linkBar';
import Summary from './summary';
import CrsContent from './crsContent';
import FAQ from './FAQ';
import Tags from './tags';
import AddCart from './addCart';

export default function CourseDetail() {
  const router = useRouter();
  const [course, setCourse] = useState({
    id: 0,
    title: "",
    summary: "",
    description: "",
    img_path: "",
    price: 0,
    viewed_count: "",
    chapters:[],
    lessons:[],
    tags:[]
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
      <Head>
        <title>Course Detail</title>
      </Head>
      <div className='container'>
        <div className={["row", scss.wrapper].join(" ")}>
          <div className="col-12">
            <DetailBanner 
              title={course.title}
              img_path={course.img_path} 
              viewed_count={course.viewed_count} 
              tags={course.tags}
            />
            <LinkBar />
          </div>
          <main className="col-12 col-md-8 ">
            <Summary />
            <CrsContent 
              chapters={course.chapters}
              lessons={course.lessons}
            />
            <FAQ />
            <Tags  tags={course.tags}/>
          </main>
          <aside className={["col-12 col-md-4 ", scss.cart].join(" ")}>
            <AddCart price={course.price}/>
          </aside>
        </div>
      </div>

    </>
  )
}

CourseDetail.layout = DefaultLayout;
