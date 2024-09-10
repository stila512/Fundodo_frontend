import Link from 'next/link';
import scss from './navLink.module.scss';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function NavLinks({ isAdmin = false, uID = -1, toggleLinks = () => { } }) {
  const router = useRouter();

  const { logout } = useContext(AuthContext);

  const handleLog = () => {
    switch (uID) {
      case 0:
        router.push('/member/login');
        break;
      case 1:
        setUID(-1);
        logout();
      case -1:
      default:
        return;
    }
    toggleLinks(false);
  }

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
      <li className={scss.listBtn} onClick={() => toggleLinks(false)}>
        <button
          onClick={() => handleLog()}
          style={{
            backgroundColor: 'transparent',
            border: 'none'
          }}
          type='button'
        >
          {uID <= 0 ? '登入 / 註冊' : '登出'}
        </button>
      </li>
    </ul>
  );
}
