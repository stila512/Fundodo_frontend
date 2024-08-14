import React from 'react'
import scss from '@/pages/article/contentItems/replyBlock.module.scss';
import Image from 'next/image';

export default function ReplyBlock() {
  return (
    <>
         <div className={scss.replyBlock}>
                <div className={scss.contentCreater}>
                  <div className={[scss.userData].join()}>
                    <Image
                      className={[scss.userIcon].join()}
                      src="/logo.png"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div className={[scss.nicknameArea].join()}>
                      <p className={[scss.nickName].join()}>123123123</p>
                      <p className={[scss.creatTime].join()}>2024-07-22</p>
                    </div>
                  </div>
                  <div>點</div>
                </div>
                <div className={scss.mainContent}>
                  在一個靜謐的夜晚，一顆流星劃過天空，點亮了整片黑暗。人們抬頭仰望，心中默默許下願望。流星短暫而美麗，像是提醒我們珍惜當下的每一刻。夜風輕拂，帶來一絲涼意，彷彿是大自然的溫柔擁抱。
                </div>
                <hr style={{ width: '100%' }} />
                <div className={scss.ratingArea}>
                  <div className={scss.rateBtnArea}>
                    <button className={scss.rateBtn}>good</button>
                    <span>12</span>
                  </div>
                  <div className={scss.rateBtnArea}>
                    <button className={scss.rateBtn}>bad</button>
                    <span>3</span>
                  </div>
                </div>
              </div>
    </>
  )
}
