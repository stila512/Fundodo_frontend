import React from 'react';
import scss from '@/pages/article/commonItem/aside.module.scss';
import AsideArticle from './asideArticle';

export default function ArtiAside() {
  return (
    <>
      <aside className={[scss.leftSide].join()}>
        <div>
          <div className={scss.leftTitle}>最新文章</div>

          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />
          <AsideArticle />

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
