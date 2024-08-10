import React from 'react'
import scss from './crsContent.module.scss';
import Link from 'next/link';
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function CrsContent() {
  return (
    <>
      <div className={scss.title}>
        <h3>課程內容</h3>
      </div>
      <div className={scss.chapter}>
        <h3>5月線上遊戲課</h3>
        <Link href="">全部展開 <MdOutlineArrowForwardIos /> </Link>
      </div>
      <div className={scss.lessons}>
        <div>
          <p>浪犬博士-家長會！加入一起共學的大家庭</p>
        </div>
        <div>
          <p>浪犬博士-家長會！加入一起共學的大家庭</p>
        </div>
        <div>
          <p>浪犬博士-家長會！加入一起共學的大家庭</p>
        </div>
      </div>


    </>
  )
}
