import React from 'react';
import { useRouter } from 'next/router';
import scss from '@/pages/article/list/pageControl.module.scss';

export default function PageControl() {
  const router = useRouter();
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  // const toFirstPage = () => {
  //   router.push('/article');
  // }

  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={[scss.ctrler].join()}>
          <a className={[scss.ctrlText].join()} href='/article/createArticle'>發表新文章</a>
        </div>
        <div className={[scss.ctrler].join()}>
          <a className={[scss.ctrlText].join()} onClick={()=>toTop()}>回到頂端</a>
        </div>
        {/* <div className={[scss.ctrler].join()}>
          <a className={[scss.ctrlText].join()} onClick={()=>toFirstPage()}>到第一頁</a>
        </div> */}
      </div>
    </>
  );
}
