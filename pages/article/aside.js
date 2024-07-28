import React from 'react';
import scss from '@/pages/article/aside.module.scss';
import AsideArticle from './asideArticle';

export default function ArtiAside() {
  return (
    <>
      <aside className={[scss.leftSide].join()}>
        <div>
          <div className={[scss.leftTitle].join()}>最新文章</div>
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <div className={[scss.leftTitle].join()}>熱門文章</div>
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
