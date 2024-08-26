import scss from '../navHeader.module.scss';
import Logo from '@/components/common/logo';

import NavLinks from '../NavLinks';
import NavFuncBtns from '../NavFuncBtns';
import { GiHamburgerMenu } from "react-icons/gi";
/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  return (
    <header className={scss.layout}>
      <div className='container'>
        <button className={['d-lg-none', scss.hbgBtn].join(' ')}>
          <GiHamburgerMenu />
        </button>
        <Logo width={210} href="/"></Logo>
        <nav className='txPrimary'>
          <NavLinks />
          <NavFuncBtns />
        </nav>
      </div>
    </header>
  );
}
