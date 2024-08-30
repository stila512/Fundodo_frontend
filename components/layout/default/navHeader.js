import scss from '../navHeader.module.scss';
import Logo from '@/components/common/logo';

import { useState } from 'react';
import NavLinks from '../NavLinks';
import NavFuncBtns from '../NavFuncBtns';
import { GiHamburgerMenu } from "react-icons/gi";
import FddBtn from '@/components/buttons/fddBtn';
/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <header className={scss.layout}>
      <div className='container'>
        <FddBtn
          color='white'
          pill={false}
          icon
          className={scss.hbgBtn}
          callback={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </FddBtn>
        <Logo width={210} href="/"></Logo>
        <nav className='txPrimary'>
          {showMenu && <NavLinks />}
          <NavFuncBtns />
        </nav>
      </div>
    </header>
  );
}
