import React from 'react';
import scss from '@/pages/article/pageControl.module.scss';

export default function PageControl() {
  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={[scss.ctrler].join()}>
          <span className={[scss.ctrlText].join()}>發表新文章</span>
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
