import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import ArticleBlock from './articleBlock';
import scss from '@/pages/article/list/articleList.module.scss';


export default function ArticleList() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 6
  const router=useRouter()
  const { sort,search,tag } = router.query
  
  useEffect(() => {
    const fetchArticles = async () => {
      let url = 'http://localhost:3005/api/article/articles?'
      const params = new URLSearchParams()

      if (sort) {
        params.append('sort', sort)
      }
      if (search) {
        params.append('search', search)
      }
      if (tag) {
        params.append('tag', tag)
      }

      url += params.toString()

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'success') {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, [sort, search,tag])
  

  const thisPage = page * perPage
  const fitstArticle = thisPage - perPage
  const currentArticle = articles.slice(fitstArticle, thisPage)

  const changePage = (pageNum) => {
    setPage(pageNum);
    // 滾動到頁面頂部
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 這會使滾動更平滑
    });
  }
  return (
    <>
      {' '}
      <div className={[scss.listArea].join()}>
        <div className={[scss.articleList].join()}>
          {currentArticle.map(article => (
            <ArticleBlock key={article.id} article={article} />
          ))}
        </div>
        <div className={scss.pageChange}>
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            上一頁
          </button>
          <span>{page}</span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={thisPage >= articles.length}
          >
            下一頁
          </button>
        </div>
      </div>

    </>
  );
}
