import React, { useState, useEffect } from 'react'
import FddBtn from '@/components/buttons/fddBtn';
import scss from './articleSec.module.scss';
import Image from 'next/image';
import AtBg from '@/public/homePic/at_bg.svg'
import Link from 'next/link';
import axios from 'axios';

export default function ArticleSec() {
  const [articles, setArticles] = useState([])
  const baseUrl = 'http://localhost:3005'

  useEffect(() => {
    const fetchArticlesAndImages = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/article/articles`)
        const data = await response.json()
        if (data.status === 'success') {
          const articlesWithImages = await Promise.all(
            data.articles.map(async (article) => ({
              ...article,
              imagePath: await getImagePath(article.id)
            }))
          )
          setArticles(articlesWithImages)
        }
      } catch (error) {
        console.log('Error fetching articles:', error.message)
      }
    }

    fetchArticlesAndImages()
  }, [])

  const getImagePath = async (articleId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/article/images/${articleId}`)
      if (response.data && response.data.imagePath) {
        return `${baseUrl}${response.data.imagePath}`
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    }
    return '/defaltImg.jpg'
  }

  if (!articles.length) return null

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
    <section className={['mb-5', scss.bgWrapper].join(' ')}>
      <div className={scss.bg} style={{ '--bg-image': `url(${AtBg.src})` }}>
        <div className='container'>
          <div className={scss.card_text}>
            <h2>最新文章</h2>
            <FddBtn color='tint3' outline href='/'>閱讀更多</FddBtn>
          </div>

          <div className={scss.cards}>
            {articles.slice(0, 3).map(article => (
              <div key={article.id} className={scss.card}>
                <div className={scss.imageWrapper}>
                  <Image
                    src={article.imagePath}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className={scss.card_img}
                  />
                </div>
                <div className={scss.card_body}>
                  <p>{formatDate(article.create_at)}</p>
                  <h3>{article.title}</h3>
                  <h4><div dangerouslySetInnerHTML={{ __html: article.content.substring(0, 20) + '...' }} /></h4>
                  <Link href={`/article/content?aid=${article.id}`} className={scss.link}>More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}