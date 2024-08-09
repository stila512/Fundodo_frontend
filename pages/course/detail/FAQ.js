import React from 'react'
import scss from './FAQ.module.scss';
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";

export default function FAQ() {
  return (
    <>
      <div className={scss.title}>
        <h3>常見問題</h3>
        </div>
        <div className={scss.faqItem}>
            <div className={scss.faq_q}>
                <p>課程開始前我需要先準備什麼嗎？</p>
                <IoIosArrowDown />
            </div>
            <div className={scss.faq_a}>
                <p>這堂不是直播課程，課程皆為預錄，並以高規格影像方式呈現。開通後您就可不限次數觀看，並可以在電腦、手機專屬App雙平台中，任意的時間、地點，隨時隨地無限暢看學習！</p>
            </div>
            <div className={scss.faq_q}>
                <p>課程開始前我需要先準備什麼嗎？</p>
                <IoIosArrowDown />
            </div>
            <div className={scss.faq_q}>
                <p>課程開始前我需要先準備什麼嗎？</p>
                <IoIosArrowDown />
            </div>
        </div>
        <div className={scss.sort}>
        <h3>相關分類</h3>
        </div>
   


    </>
  )
}
