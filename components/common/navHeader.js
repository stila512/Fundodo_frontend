import Link from 'next/link';
import scss from './navHeader.module.scss';
import Logo from './logo';
import { IoIosArrowDown, IoMdPerson } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';

/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  return (
    <header className={scss.layout}>
      <div className={scss.container}>
        <Logo width={210} href="/"></Logo>
        <nav className={scss.txPrimary}>
          <ul className={scss.ulLink}>
            <li>
              <Link href="#">首頁</Link>
            </li>
            <li className={scss.listBtn}>
              <Link href="#">商品列表</Link>
              <IoIosArrowDown />
              <ul className={scss.prodList}>
                <li>
                  <Link href="#">狗勾飼料</Link>
                </li>
                <li>
                  <Link href="#">狗勾罐頭</Link>
                </li>
                <li>
                  <Link href="#">狗勾零食</Link>
                </li>
                <li>
                  <Link href="#">保健食品</Link>
                </li>
                <li>
                  <Link href="#">狗勾玩具</Link>
                </li>
                <li>
                  <Link href="#">外出用品</Link>
                </li>
              </ul>
            </li>
            <li className={scss.listBtn}>
              <Link href="#">線上課程</Link>
              <IoIosArrowDown />
              <ul className={scss.prodList}>
                <li>
                  <Link href="#">課程列表</Link>
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
              <Link href="#">寵物旅館</Link>
            </li>
            <li>
              <Link href="#">討論區</Link>
            </li>
          </ul>
          <ul className={scss.ulFunc}>
            <li>
              <button>
                <AiOutlineSearch />
              </button>
            </li>
            <li>
              <a href="#">
                <IoMdPerson />
              </a>
            </li>
            <li>
              <a href="#">
                <IoCart />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
