import { useState, useEffect } from 'react';
import ArticleBlock from './articleBlock';
import scss from '@/pages/article/articleList.module.scss';


export default function ArticleList() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    fetch('http://localhost:3001/api/articles')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setArticles(data.articles)
        }
      }).catch(error => console.log(error.message))
  }, [])

  const thisPage = page * perPage
  const fitstArticle = thisPage - perPage
  const currentArticle = articles.slice(fitstArticle, thisPage)

  const changePage = (pageNum) => setPage(pageNum)
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
