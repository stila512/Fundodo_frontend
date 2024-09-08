import Link from 'next/link';
import scss from './navLink.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function NavLinks({ toggleLinks = () => { } }) {

  const { user } = useContext(AuthContext);

  //判斷管理員登入
  const isAdmin = user && user.user_level >= 20;

  return (
    <ul className={scss.ulLink}>
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <Link href="/home">首頁</Link>
      </li>
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <Link href="/prod">寵物商城</Link>
      </li>
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <Link href="/course"> 線上課程</Link>
      </li>
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <Link href="/hotel/list">寵物旅館</Link>
      </li>
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <Link href="/article">討論區</Link>
      </li>
      {isAdmin && (
        <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
          <Link href="/backend/course">後台管理</Link>
        </li>
      )}
    </ul>
  );
}
