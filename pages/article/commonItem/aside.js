import {useState,useEffect} from 'react'
import scss from '@/pages/article/commonItem/aside.module.scss'
import AsideArticle from './asideArticle'

export default function ArtiAside() {
  const [articles,setArticles]=useState([])
  const [randomArticles, setRandomArticles] = useState([]);

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

  useEffect(() => {
    if (articles.length > 0) {
      const shuffled = [...articles].sort(() => 0.5 - Math.random());
      setRandomArticles(shuffled.slice(0, 5));
    }
  }, [articles]);

  return (
    <>
      <aside className={[scss.leftSide].join()}>
        <div>
          <div className={scss.leftTitle}>最新文章</div>
          {articles.slice(0,5).map(arti => (
            <AsideArticle key={arti.id} article={arti} />
          ))}

          <div className={scss.leftTitle} style={{ background: '#71C4EF', marginTop: '30px' }}>熱門文章</div>
          {randomArticles.map(arti => (
            <AsideArticle key={arti.id} article={arti} />
          ))}
        </div>
      </aside>
    </>
  );
}
