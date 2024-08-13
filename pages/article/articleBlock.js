import React from 'react';
import Image from 'next/image';
import scss from '@/pages/article/articleBlock.module.scss';
import { FaRegEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

export default function ArticleBlock({ article }) {
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
              <p className={[scss.creatTime].join()}>{article.create_at}</p>
            </div>
          </div>
        </div>
        <div className={[scss.shortContent].join()}>
          <a className={[scss.mainTitle].join()} href={`/article/content?aid=${article.id}`}>
            {article.title}
          </a>
          <div className={[scss.extract].join()}>
            {article.content.substring(0, 50)+'...'}
          </div>
        </div>
        <div className={[scss.artiInfo].join()}>
          <div className={[scss.artiTags].join()}>
            <div className={[scss.tag].join()}>狗狗</div>
            <div className={[scss.tag].join()}>寵物</div>
            <div className={[scss.tag].join()}>內有惡犬</div>
          </div>
          <div className={[scss.info].join()}>
            <div className={[scss.infoText].join()}><FaRegEye />120</div>
            <div className={[scss.infoText].join()}><FiMessageSquare />15</div>
          </div>
        </div>
      </div>
    </>
  );
}
