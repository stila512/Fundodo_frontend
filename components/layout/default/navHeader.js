import scss from '../navHeader.module.scss';
import Logo from '@/components/common/logo';
import { breakpoints } from '@/configs';

import { useState } from 'react';
import NavLinks from '../NavLinks';
import NavFuncBtns from '../NavFuncBtns';
import { GiHamburgerMenu } from "react-icons/gi";
import useScreenWidth from '@/hooks/useScreenWidth';

import FddBtn from '@/components/buttons/fddBtn';
/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const screenWidth = useScreenWidth();

  return (
    <header className={scss.header}>
      <div className='container'>
        <div className={scss.headerMembrane}></div>
        <div className={scss.beside}>
          <FddBtn
            color='white'
            pill={false}
            icon
            className={scss.hbgBtn}
            callback={() => setShowMenu(!showMenu)}
          >
            <GiHamburgerMenu />
          </FddBtn>
        </div>
        <div className={scss.center}>
          <Logo width={210} href="/"></Logo>
        </div>
        <nav className={scss.beside}>
          {(screenWidth >= breakpoints.md || showMenu) && <NavLinks />}
          <NavFuncBtns />
        </nav>
      </div>
    </header>
  );
}
