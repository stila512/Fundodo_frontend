import React, { useRef } from 'react';
import scss from '@/pages/article/titleAction.module.scss'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

export default function TitleAction() {
  const scrollSort = useRef(null);
  const scrollRight = () => {
    if (scrollSort.current) {
      scrollSort.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  }
  const scrollLeft = () => {
    if (scrollSort.current) {
      scrollSort.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  }
  return (
    <>
      <div className={[scss.titleAction].join()}>
        <div className={[scss.btnList].join()}>
          <button className={scss.backBtn} onClick={scrollRight}>
            <IoIosArrowBack />
          </button>
          <div className={[scss.sortList].join()} ref={scrollSort}>
            <button className={[scss.sortBtn].join()}>全部分類</button>
            <button className={[scss.sortBtn].join()}>毛孩百科</button>
            <button className={[scss.sortBtn].join()}>寵食大評比</button>
            <button className={[scss.sortBtn].join()}>寵物保健</button>
            <button className={[scss.sortBtn].join()}>品牌好物推薦</button>
          </div>
          <button className={scss.moreBtn} onClick={scrollLeft}>
            <IoIosArrowForward />
          </button>


        </div>
      </div>
    </>
  );
}
