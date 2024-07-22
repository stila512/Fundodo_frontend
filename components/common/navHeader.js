import Image from 'next/image';
import scss from './navHeader.module.scss';
import logo from '@/assets/logo_temp.png';

export default function NavHeader() {
  return (
    <header className={scss.layout}>
      <div className={scss.container}>
        <div className={[scss.logo, scss.imgWrap, scss.txPrimary].join(' ')}>
          <Image src={logo} alt="FUNDODO logo" width={210} height={67} />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">首頁</a>
            </li>
            <li>
              <a href="#">商品列表</a>
            </li>
            <li>
              <a href="#">線上課程</a>
            </li>
            <li>
              <a href="#">寵物旅館</a>
            </li>
            <li>
              <a href="#">討論區</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
