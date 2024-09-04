import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';
import scss from '@/pages/article/contentItems/articleContent.module.scss';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike,BiDislike } from "react-icons/bi";

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
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userRating, setUserRating] = useState(null)
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
            setLikes(articleContent.likes || 0);
            setDislikes(articleContent.dislikes || 0);
            onContentLoad(data.content[0])
          }
        }).catch(error => console.log(error.message))

      // 獲取用戶的評分（如果已登入）
      if (user && user.userId) {
        fetch(`http://localhost:3005/api/article/userRating/${aid}/${user.userId}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              setUserRating(data.rating);
            }
          }).catch(error => console.log(error.message))
      }
    }
  }, [aid, onContentLoad, user])

  const canEdit = () => {
    if (!user || !content) return false;
    return user.userId === content.userid || (user.userLevel && user.userLevel > 2);
  }

  const handleRating = async (isLike) => {
    if (!user || !user.userId) {
      alert('請先登入再進行評分');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/api/article/rate/${aid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          isLike: isLike
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserRating(isLike ? 'like' : 'dislike');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error rating article:', error);
      alert('評分失敗，請稍後再試');
    }
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
        <div className={scss.ratingArea}>
          <div className={scss.rateBtnArea}>
            <button 
              className={`${scss.rateBtn} ${userRating === 'like' ? scss.active : ''}`}
              onClick={() => handleRating(true)}
              disabled={userRating === 'like'}
            >
              <BiLike />
            </button>
            <span>{likes}</span>
          </div>
          <div className={scss.rateBtnArea}>
            <button 
              className={`${scss.rateBtn} ${userRating === 'dislike' ? scss.active : ''}`}
              onClick={() => handleRating(false)}
              disabled={userRating === 'dislike'}
            >
              <BiDislike />
            </button>
            <span>{dislikes}</span>
          </div>
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