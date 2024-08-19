import {useState,useEffect} from 'react';
import scss from '@/pages/article/commonItem/aside.module.scss';
import AsideArticle from './asideArticle';

export default function ArtiAside() {
  const [articles,setArticles]=useState([])
  useEffect(() => {
    const fetchArticles = async () => {
      const url = 'http://localhost:3001/api/articles'

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'success') {
          setArticles(data.articles);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchArticles();
  }, [])
  return (
    <>
      <aside className={[scss.leftSide].join()}>
        <div>
          <div className={scss.leftTitle}>最新文章</div>
          {articles.slice(0,5).map(arti => (
            <AsideArticle key={arti.id} article={arti} />
          ))}

          <div className={scss.leftTitle} style={{ background: '#71C4EF', marginTop: '30px' }}>熱門文章</div>

          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
        </div>
      </aside>
    </>
  );
}
