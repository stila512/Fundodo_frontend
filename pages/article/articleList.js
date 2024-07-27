import React from 'react';
import ArticleBlock from './articleBlock';
import scss from '@/pages/article/articleList.module.scss';


export default function ArticleList() {
  return (
    <>
      {' '}
      <div className={[scss.articleList].join()}>
        <ArticleBlock />
        <ArticleBlock />
        <ArticleBlock />
        <ArticleBlock />
        <ArticleBlock />
        <ArticleBlock />
      </div>
    </>
  );
}
