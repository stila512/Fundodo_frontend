import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import scss from '@/pages/article/commonItem/asideArticle.module.scss';
import axios from 'axios';

export default function AsideArticle({ article }) {
  const [imagePath, setImagePath] = useState('/defaltImg.png');
  const baseUrl = 'http://localhost:3005'
  useEffect(() => {
    if (article && article.id) {
      // 發送請求到後端 API 來獲取圖片路徑
      axios.get(`http://localhost:3005/api/article/images/${article.id}`)
        .then(response => {
          if (response.data && response.data.imagePath) {
            setImagePath(`${baseUrl}${response.data.imagePath}`);
            // `http://localhost:3005/${response.data.imagePath}`
          }
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }
  }, [article]);

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
        <div className={scss.imgWrapper}>
          <Image src={imagePath}
            alt=""
            layout="fill"
            className={scss.leftArtiImg}
          />
        </div>

        <div className={[scss.leftArticleTitle].join()}>
          <a className={[scss.leftTitle].join()} href={`/article/content?aid=${article.id}`}>
            {"【" + article.sort + "】" + article.title.substring(0, 20) + '...'}
          </a>
          <p className={[scss.leftTime].join()}>{formatDate(article.create_at)}</p>
        </div>
      </div>

    </>
  );
}
