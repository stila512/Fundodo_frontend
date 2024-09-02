import React,{useState,useEffect} from 'react'
import FddBtn from '@/components/buttons/fddBtn';
import scss from './articleSec.module.scss';
import Image from 'next/image';
import artdog1 from '@/public/homePic/artdog2.png';
import AtBg from '@/public/homePic/at_bg.svg'
import Link from 'next/link';
import axios from 'axios';


export default function ArticleSec() {
  const [imagePath, setImagePath] = useState('/defaltImg.jpg');
  const baseUrl = 'http://localhost:3005'
  const [articles,setArticles]=useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const url = 'http://localhost:3005/api/article/articles'

      try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.status === 'success') {
          setArticles(data.articles)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchArticles()
  }, [])
  // useEffect(() => {
  //   if (articles && articles.id) {
  //     // 發送請求到後端 API 來獲取圖片路徑
  //     axios.get(`http://localhost:3005/api/article/images/${articles.id}`)
  //       .then(response => {
  //         if (response.data && response.data.imagePath) {
  //           setImagePath(`${baseUrl}${response.data.imagePath}`);
  //           // `http://localhost:3005/${response.data.imagePath}`
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching image:', error);
  //       });
  //   }
  // }, [articles]);

  if (!articles) return null
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
    <section className={scss.bgWrapper}>
      <div className={scss.bg} style={{'--bg-image': `url(${AtBg.src})`}}>
      <div className='container'>
        <div className={scss.card_text}>
          <h2>最新文章</h2>
          <FddBtn color='tint3' outline href='/'>閱讀更多</FddBtn>
        </div>

        <div className={scss.cards}>
        {articles.slice(0,3).map(arti => (
          <div className={scss.card}>
            <Image src={imagePath}
            alt=""
            width={424}
            height={322}
            className={scss.card_img}
             />
            <div className={scss.card_body}>
              <p>{formatDate(arti.create_at)}</p>
              <h3>{arti.title}</h3>
              <h4><div dangerouslySetInnerHTML={{ __html: arti.content.substring(0, 20)+'...' }} /></h4>
              <Link href={`/article/content?aid=${arti.id}`} className={scss.link}>More</Link>
            </div>
          </div>
          ))}
          
        </div>


      </div>
      </div>
      </section>
    </>
  )
}
