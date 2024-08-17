import React from 'react';
import scss from '@/pages/article/list/pageControl.module.scss';

export default function PageControl() {
  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={[scss.ctrler].join()}>
          <a className={[scss.ctrlText].join()} href='/article/createArticle'>發表新文章</a>
        </div>
        <div className={[scss.ctrler].join()}>
          <span className={[scss.ctrlText].join()}>回到頂端</span>
        </div>
        <div className={[scss.ctrler].join()}>
          <span className={[scss.ctrlText].join()}>到第一頁</span>
        </div>
      </div>
    </>
  );
}
