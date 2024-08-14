import React from 'react';
import Image from 'next/image';
import scss from '@/pages/article/commonItem/asideArticle.module.scss';

export default function AsideArticle() {
  return (
    <>
      {' '}
      <div className={[scss.leftArticle].join()}>
        <Image src="/logo.png" alt="" width={138} height={100} />
        <div className={[scss.leftArticleTitle].join()}>
          <p className={[scss.leftTitle].join()}>那裏有一隻可愛的狗溝</p>
          <p className={[scss.leftTime].join()}>2024-07-22</p>
        </div>
      </div>

    </>
  );
}
