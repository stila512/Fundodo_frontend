import FddBtn from '@/components/buttons/fddBtn'
import React from 'react'
import scss from './tags.module.scss';
import { MdArrowForwardIos } from "react-icons/md";


export default function Tags() {
  return (
    <>
      <div className="box">
        <div className={["row", scss.tags].join(' ')}>
          <button className={scss.btn}>全部分類</button>
          <button className={scss.btn}>外出禮儀</button>
          <button className={scss.btn}>感情增溫</button>
          <button className={scss.btn}>正向教養體驗式課程</button>
          <button className={scss.btn}>線上行為知識講座</button>
        </div>
        {/* <div className={["d-md-none", scss.arrow].join(' ')}>
          <FddBtn color="primary" size="sm" icon callback={() => { }} >
            <MdArrowForwardIos />
          </FddBtn>
        </div> */}
      </div>
    </>
  )
}
