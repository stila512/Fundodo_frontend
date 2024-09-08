import Link from 'next/link';
import scss from './navLink.module.scss';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function NavLinks({ toggleLinks = () => { } }) {
  const router = useRouter();

  const { user, logout } = useContext(AuthContext);
  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);

  useEffect(() => {
    (user === null) ? setUID(0) : setUID(user.userId);
  }, [user])

  //判斷管理員登入
  const isAdmin = user && user.user_level >= 20;

  const handleLog = () => {
    if (uID <= 0) {
      router.push('/member/login');
    } else {
      setUID(-1);
      logout();
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
