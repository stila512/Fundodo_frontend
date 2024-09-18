import { useState, useEffect,useRef,useCallback } from 'react';
import { useRouter } from 'next/router'
import ArticleBlock from './articleBlock';
import scss from '@/pages/article/list/articleList.module.scss';
import PageBtn from './pageBtn';


export default function ArticleList({orderBy}) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const perPage = 6
  const router=useRouter()
  const { sort,search,tag } = router.query
  const debounceTimerRef = useRef(null);
  
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
      if (orderBy) {
        params.append('orderBy', orderBy)
      }

      url += params.toString()

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'success') {
          setArticles(data.articles);
          setTotalPages(Math.ceil(data.articles.length / perPage));
          setPage(1)
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, [sort, search,tag,orderBy])
  
  useEffect(() => {
    setPage(1);
  }, [sort, search, tag,orderBy]);


  const debouncedPageChange = useCallback((newPage) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      console.log('Debounced page change:', newPage);
      setPage(newPage);
    }, 300);
  }, []);

  const currentArticles = articles.slice((page - 1) * perPage, page * perPage);
  return (
    <>
      {' '}
      <div className={scss.listArea}>
      <div className={scss.articleList}>
        {currentArticles.map(article => (
          <ArticleBlock key={article.id} article={article} />
        ))}
      </div>
      {totalPages > 1 &&(<PageBtn 
          page={page} 
          totalPages={totalPages} 
          onPageChange={debouncedPageChange}
        />)}
    </div>
    </>
  );
}
