import React from 'react';
import Image from 'next/image';
import style from '@/styles/style.module.scss';
import hstyle from './hotelSec.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoAddCircle } from 'react-icons/io5';
import review from "@/public/homepagePic/review.png";




export default function HotelSec() {
  return (
    <>
      <div className={style.container}>
        <div className={hstyle.hotelSec}>
          <div className={hstyle.hotelContent}>
            <div className={hstyle.hotelText}>
              <h2>安心寵物住宿!</h2>
              <p>我們提供舒適、安全的住宿環境，全天候專業照顧，並安排每日活動，確保您的愛犬在這裡享受快樂、<br /> 放鬆的度假時光。</p>
            </div>
            <div className={hstyle.btns}>
              <button aria-label="上一張" className={hstyle.arrowBtn}>
                <IoIosArrowDropleft className={hstyle.arrows} />
              </button>
              <button aria-label="下一張" className={hstyle.arrowBtn}>
                <IoIosArrowDropright className={hstyle.arrows} />
              </button>
            </div>
          </div>
          <div className={hstyle.hotelReview}>
            <div className="images">
              <Image src={review}></Image>
            </div>
            <div className={hstyle.content}>
              <div className={hstyle.text}>
                <h4>無與倫比的服務</h4>
                <p>我的狗狗在這裡得到了最好的照顧。旅館環境乾淨、安全，工作人員非常有愛心和專業，每天都會定時帶狗狗活動，讓我完全放心。非常推薦！</p>
              </div>
              <div className={hstyle.info}>
                <h6>汪主人</h6>
                <p>2024/06/17</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
