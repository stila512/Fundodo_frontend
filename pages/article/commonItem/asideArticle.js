import React from 'react';
import Image from 'next/image';
import scss from '@/pages/article/commonItem/asideArticle.module.scss';

export default function AsideArticle({article}) {
  if (!article) return null
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  return (
    <>
      {' '}
      <div className={[scss.leftArticle].join()}>
        <Image src="/logo.png" alt="" width={138} height={100} />
        <div className={[scss.leftArticleTitle].join()}>
          <a className={[scss.leftTitle].join()} href={`/article/content?aid=${article.id}`}>{article.title}</a>
          <p className={[scss.leftTime].join()}>{formatDate(article.create_at)}</p>
        </div>
      </div>

    </>
  );
}
