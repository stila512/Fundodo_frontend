//== Parameters ================================================================
import { breakpoints } from '@/configs';
//== Functions =================================================================
import { useState } from 'react';
//== Components ================================================================
import Logo from '@/components/common/logo';
import FddBtn from '@/components/buttons/fddBtn';
import NavFuncBtns from '../NavFuncBtns';
import NavLinks from '../NavLinks';
//== Styles =================================================================
import { GiHamburgerMenu } from "react-icons/gi";
import useScreenWidth from '@/hooks/useScreenWidth';
import scss from '../navHeader.module.scss';

/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const screenWidth = useScreenWidth();

  return (
    <header className={scss.header}>
      <div className='container h-100'>
        <div className={scss.headerMembrane}>
          <div className='d-block d-md-none flex-grow-1 flex-lg-grow-0'>
            <FddBtn
              color='white'
              pill={false}
              icon
              className={[scss.hbgBtn, showMenu ? scss.active : ''].join(' ')}
              callback={() => setShowMenu(!showMenu)}
            >
              {/* <GiHamburgerMenu /> */}
              <div className={scss.bar}></div>
            </FddBtn>
          </div>
          <div className='pos-a t-50 l-50 translate-middle pos-md-r t-md-0 l-md-0 translate-middle-md-none'>
            <Logo width={210} href="/"></Logo>
          </div>
          <nav className='flex-grow-1 flex-lg-grow-0'>
            {
              (screenWidth >= breakpoints.md || showMenu) &&
              <NavLinks />
            }
            <NavFuncBtns />
          </nav>
        </div>
      </div>
    </header>
  );
}
