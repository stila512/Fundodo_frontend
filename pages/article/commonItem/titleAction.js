import React, { useRef, useState, useEffect } from 'react';
import scss from '@/pages/article/commonItem/titleAction.module.scss';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import Link from 'next/link';

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
  const [sort, setSort] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/article/sort')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setSort(data.sorts)
        }
      }).catch(error => console.log(error.message))
  }, [])
  return (
    <>
      <div className={[scss.titleAction].join()}>
        <div className={[scss.btnList].join()}>
          <button className={scss.backBtn} onClick={scrollRight}>
            <IoIosArrowBack />
          </button>
          <div className={[scss.sortList].join()} ref={scrollSort}>
            <Link className={[scss.sortBtn].join()} href='/article'>全部分類</Link>
            {sort.map(sortitem => (
              <Link key={sortitem.id} className={[scss.sortBtn].join()} href={`/article?sort=${sortitem.id}`}>{sortitem.sort}</Link>)
              )}
          </div>
          <button className={scss.moreBtn} onClick={scrollLeft}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
