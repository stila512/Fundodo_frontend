import React,{useRef} from 'react';
import scss from '@/pages/article/asideRwd.module.scss';
import AsideArticle from './asideArticle';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

export default function ArtiAside() {
  const scrollArticleNew = useRef(null);
  const scrollRightNew = () => {
    if (scrollArticleNew.current) {
      scrollArticleNew.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  }
  const scrollLeftNew = () => {
    if (scrollArticleNew.current) {
      scrollArticleNew.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  }
  const scrollArticleHot = useRef(null);
  const scrollRightHot = () => {
    if (scrollArticleHot.current) {
      scrollArticleHot.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  }
  const scrollLeftHot = () => {
    if (scrollArticleHot.current) {
      scrollArticleHot.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  }
  return (
    <>
      <aside className={[scss.leftSide].join()}>
        <div className={scss.asideContainer}>
          <div className={scss.asideSection}>
            <div className={scss.leftTitle}>最新文章</div>
            <button className={scss.backBtn} onClick={scrollRightNew}>
              <IoIosArrowBack />
            </button>
            <div className={scss.articleList} ref={scrollArticleNew}>
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
            </div>
            <button className={scss.moreBtn} onClick={scrollLeftNew}>
              <IoIosArrowForward />
            </button>
            
          </div>
          <div className={scss.asideSection}>
            <div className={scss.leftTitle} style={{ background: '#71C4EF' }}>熱門文章</div>
            <button className={scss.backBtn} onClick={scrollRightHot}>
              <IoIosArrowBack />
            </button>
            <div className={scss.articleList}  ref={scrollArticleHot}>
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
              <AsideArticle />
            </div>
            <button className={scss.moreBtn} onClick={scrollLeftHot}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}