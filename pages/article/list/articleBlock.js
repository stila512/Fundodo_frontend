import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import scss from '@/pages/article/list/articleBlock.module.scss';
import { FaRegEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

export default function ArticleBlock({ article }) {
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
              <p className={[scss.nickName].join()}>{article.author_nickname}</p>
              <p className={[scss.creatTime].join()}>{formatDate(article.create_at)}</p>
            </div>
          </div>
        </div>
        <div className={[scss.shortContent].join()}>
          <a className={[scss.mainTitle].join()} href={`/article/content?aid=${article.id}`}>
            {"【"+article.sort+"】"+article.title}
          </a>
          <div className={[scss.extract].join()}>
          <div dangerouslySetInnerHTML={{ __html: article.content.substring(0, 20)+'...' }} />
            {/* {article.content.substring(0, 50)+'...'} */}
          </div>
        </div>
        <div className={[scss.artiInfo].join()}>
          <div className={[scss.artiTags].join()}>
          {article.tags && article.tags.map((tag, index) => (
              <Link key={index} href={`/article?tag=${encodeURIComponent(tag)}`}>
                <div className={[scss.tag].join()}>{tag}</div>
              </Link>
            ))}
          </div>
          <div className={[scss.info].join()}>
            <div className={[scss.infoText].join()}><FaRegEye />120</div>
            <div className={[scss.infoText].join()}><FiMessageSquare />{article.reply_count || 0}</div>
          </div>
        </div>
      </div>
    </>
  );
}
