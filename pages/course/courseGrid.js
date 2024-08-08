import React from 'react'
import scss from "./courseGrid.module.scss"
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import dog from "@/public/homepagePic/courseimg.png"

export default function CourseGrid() {
    return (
        <>
            <div className='container'>
                <div className={scss.cards}>
                    <div className={scss.card}>
                        <div className={scss.imgBox}> 
                        <Image src={dog} className={scss.crs_image} />
                        </div>
                        <div className={scss.cardText}>
                        <h3>【狗狗教養實作】線上體驗課</h3>
                        <div className='d-flex gap-1 ai-center'>
                            <AiOutlineUser /> <p>125人來學習</p>
                        </div>
                        </div>

                        

                    </div>
                    <div className={scss.card}></div>
                </div>
            </div>
        </>
    )
}
