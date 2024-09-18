import React, { useState } from 'react'
import scss from './FAQ.module.scss';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function FAQ() {

    const [accordion, setAccordion] = useState(null)

    const toggleAccordion = (index) => {
        setAccordion(accordion === index ? null : index)
    }


    return (
        <>
        <div className={scss.title}>
        <h3 >常見問題</h3>
        </div>
            
            <div className={scss.faqItem}>
                <div className={scss.faq_q} onClick={() => { toggleAccordion(0) }}>
                    <p><FaRegQuestionCircle /> 課程開始前我需要先準備什麼嗎？</p>
                    <IoIosArrowDown />
                </div>
                {accordion === 0 && (
                    <div className={scss.faq_a}>
                        <p>這堂不是直播課程，課程皆為預錄，並以高規格影像方式呈現。開通後您就可不限次數觀看，並可以在電腦、手機專屬App雙平台中，任意的時間、地點，隨時隨地無限暢看學習！</p>
                    </div>
                )}

                <div className={scss.faq_q} onClick={() => { toggleAccordion(1) }}>
                    <p><FaRegQuestionCircle /> 這個課程適合初學者嗎？還是需要有相關經驗？</p>
                    <IoIosArrowDown />
                </div>
                {accordion === 1 && (
                    <div className={scss.faq_a}>
                        <p>本課程設計適合各個階段的狗主人，從初學者到有經驗的飼主都能受益。我們會從基礎概念開始講解，逐步深入到更高階的技巧。對於初學者，這是一個excellent的起點；對於有經驗的飼主，課程也提供了許多新穎的觀點和進階技巧，幫助您更好地了解和培養您的狗狗。</p>
                    </div>
                )}

                <div className={scss.faq_q} onClick={() => { toggleAccordion(2) }}>
                    <p><FaRegQuestionCircle /> 課程中是否包含實際的訓練示範？</p>
                    <IoIosArrowDown />
                </div>
                {accordion === 2 && (
                    <div className={scss.faq_a}>
                        <p>是的，課程中包含大量的實際訓練示範。每個主題都配有詳細的影片演示，展示如何在日常生活中應用這些技巧。此外，我們還提供了練習指南和檢查清單，幫助您逐步實踐所學。如果您在應用過程中遇到任何問題，可以在課程的討論區提問，我們的專業團隊會及時為您解答。</p>
                    </div>
                )}

            </div>
            <div className={scss.sort}>
                <h3>相關分類</h3>
            </div>



        </>
    )
}
