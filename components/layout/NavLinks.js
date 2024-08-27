import Link from 'next/link';
import scss from './navHeader.module.scss';
import { IoIosArrowDown } from 'react-icons/io';

export default function NavLinks() {
  return (
    <ul className={scss.ulLink}>
      <li>
        <Link href="/home">首頁</Link>
      </li>
      <li className={scss.listBtn}>
        <Link href="/prod">寵物商城</Link>
      </li>
      <li className={scss.listBtn}>
        <Link href="/course">線上課程</Link>
        <IoIosArrowDown />
        <ul className={scss.prodList}>
          <li>
            <Link href="/course/detail">課程列表</Link>
          </li>
          <li>
            <Link href="#">課程分類</Link>
          </li>
          <li>
            <Link href="#">熱門課程</Link>
          </li>
          <li>
            <Link href="#">常見問題</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/hotel/list">寵物旅館</Link>
      </li>
      <li>
        <Link href="/article">討論區</Link>
      </li>
    </ul>
  );
}
