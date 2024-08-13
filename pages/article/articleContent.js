import React from 'react'
import Image from 'next/image';
import scss from '@/pages/article/articleContent.module.scss';
import { format } from 'date-fns';

export default function ArticleContent({ content }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second:'2-digit',
      hour12: false
    });
  };
  return (
    <>
      <div className={[scss.articleContent].join()}>
        <div className={[scss.contentCreater].join()}>
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
              <p className={[scss.creatTime].join()}>{formatDate(content.create_at)}</p>
            </div>
          </div>
          <div>點</div>
        </div>
        <div className={[scss.articleTitle].join()}>{content.title}</div>
        <div className={[scss.mainContent].join()}>
          {content.content}
        </div>
        <div className={[scss.artiInfo].join()}>
          <div className={[scss.artiTags].join()}>
            <div className={[scss.tag].join()}><p>狗狗</p></div>
            <div className={[scss.tag].join()}><p>寵物</p></div>
            <div className={[scss.tag].join()}><p>內有惡犬</p></div>
          </div>
        </div>
      </div>
    </>
  )
}
