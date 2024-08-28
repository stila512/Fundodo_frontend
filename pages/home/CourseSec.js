import React from 'react';
import Image from 'next/image';
import scss from './courseSec.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
// import course from '@/public/homePic/bgc.png';
import { FaArrowRight } from "react-icons/fa";
import CourseSvg from './CourseSvg'; 


export default function CourseSec() {
  return (
    <>
      <section className={scss.bgWrapper}>
      <div className="container">
        <div className={scss.courseSec}>
          <div className={scss.courseText}>
            <h2> 讓狗兒學得更好!</h2>
            <p>透過我們的行為知識線上課程、狗兒正向學程和客製化一對一教學，為您的愛犬提供最專業的訓練和照顧，<br /> 讓牠們成為您最乖巧的好夥伴。</p>
            <FddBtn color='primary' href='#' className={scss.proBtn}>
              立即體驗 <FaArrowRight />
            </FddBtn>
          </div>
          <CourseSvg /> 
        </div>
      </div>
      </section>
    </>
  )
}
