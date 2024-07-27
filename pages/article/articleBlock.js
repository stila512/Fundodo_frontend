import React from 'react';
import Image from 'next/image';
import scss from '@/pages/article/articleBlock.module.scss';

export default function ArticleBlock() {
  return (
    <>
      {' '}
      <div className={[scss.article].join('')}>
        <div>
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
        </div>
        <div className={[scss.shortContent].join()}>
          <div className={[scss.mainTitle].join()}>
            有沒有看過這麼可愛的狗溝
          </div>
          <div className={[scss.extract].join()}>
            陽光穿透窗簾，喚醒了沉睡的城市。街角咖啡店飄出誘人香氣，行人匆匆而過。遠處傳來鳥鳴，伴隨著微風輕撫樹葉的沙沙聲。一隻貓優雅地踱步，好奇地打量著周圍的世界。新的一天，充滿無限可能。
          </div>
        </div>
        <div className={[scss.artiInfo].join()}>
          <div className={[scss.artiTags].join()}>
            <div className={[scss.tag].join()}>狗狗</div>
            <div className={[scss.tag].join()}>寵物</div>
            <div className={[scss.tag].join()}>內有惡犬</div>
          </div>
          <div className={[scss.info].join()}>
            <div className={[scss.infoText].join()}>120</div>
            <div className={[scss.infoText].join()}>15</div>
          </div>
        </div>
      </div>
    </>
  );
}
