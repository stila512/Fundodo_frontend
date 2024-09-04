import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';
import scss from '@/pages/article/contentItems/articleContent.module.scss';
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ArticleContent({ user, onContentLoad }) {
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
  const [content, setContent] = useState({})
  const router = useRouter()
  const { aid } = router.query

  useEffect(() => {
    if (aid) {
      fetch(`http://localhost:3005/api/article/articleContent/${aid}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            const articleContent = {
              ...data.content[0],
              tags: data.content[0].tags ?
                (Array.isArray(data.content[0].tags) ? data.content[0].tags : data.content[0].tags.split(','))
                : []
            }
            setContent(articleContent);
            onContentLoad(data.content[0])
          }
        }).catch(error => console.log(error.message))
    }
  }, [aid, onContentLoad])

  const canEdit = () => {
    if (!user || !content) return false;
    return user.userId === content.userid || (user.userLevel && user.userLevel > 2);
  }

  return (
    <>
      <div className={[scss.articleContent].join()}>
        <div className={[scss.contentCreater].join()}>
          <div className={[scss.userData].join()}>
            <Image
              className={[scss.userIcon].join()}
              src="/userHead.png"
              alt=""
              width={40}
              height={40}
            />
            <div className={[scss.nicknameArea].join()}>
              <p className={[scss.nickName].join()}>{content.author_nickname || '未知用戶'}</p>
              <p className={[scss.creatTime].join()}>{formatDate(content.create_at)}</p>
            </div>
          </div>
          {canEdit() && (
            <a href={`/article/editArticle?aid=${aid}`}>
              <BsThreeDotsVertical />
            </a>
          )}
        </div>
        <div className={[scss.articleTitle].join()}>{"【"+content.sort+"】"+content.title}</div>
        <div className={[scss.mainContent].join()}>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>
        <div className={[scss.artiInfo].join()}>
          <div className={[scss.artiTags].join()}>
            {content.tags && content.tags.map((tag, index) => (
              <Link key={index} href={`/article?tag=${encodeURIComponent(tag)}`}>
                <div className={[scss.tag].join()}>
                  <p>{tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
