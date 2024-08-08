import React from 'react'
import Image from 'next/image';
import { AiOutlineUser } from "react-icons/ai";
import scss from './detailBanner.module.scss';
import crsPic from "@/public/coursePic/detail.png"
import { IconContext } from "react-icons";


export default function DetailBanner() {
  return (
    <>
      <div className='container'>
        <div className={scss.banner}>
          <Image src={crsPic} className={scss.crsPic} />
          <div className={scss.info}>
            <h2>玩出好感情！與狗兒的互動遊戲課</h2>
            <div className={scss.text}>
              <div className={scss.tags}>
                <p>感情增溫</p>
              </div>
              <div className='d-flex gap-1 ai-center'>
                <AiOutlineUser />
                <p>125人來學習</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
