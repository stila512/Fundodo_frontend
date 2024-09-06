//== Parameters ================================================================
import { breakpoints } from '@/configs';
//== Functions =================================================================
import { useEffect, useState } from 'react';
import useScreenWidth from '@/hooks/useScreenWidth';
//== Components ================================================================
import Logo from '@/components/common/logo';
import NavFuncBtns from '../NavFuncBtns';
import NavLinks from '../NavLinks';
//== Styles =================================================================
import scss from '../navHeader.module.scss';
import NavToggleBtn from '../NavToggleBtn';

/**
 * 導覽列 | Fundodo 頁面基本架構
 * @description 高度固定為 70px，fixed at top
 */
export default function NavHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const screenWidth = useScreenWidth();
  const [w__screen, setW__screen] = useState(1920);

  useEffect(() => {
    setW__screen(screenWidth);
  }, [screenWidth]);

  return (
    <header className={scss.header}>
      <div className='container h-100'>
        <div className={scss.headerMembrane}>
          <div className='d-block d-md-none flex-grow-1 flex-lg-grow-0'>
            <NavToggleBtn showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
          <div className='pos-a t-50 l-50 translate-middle pos-md-r t-md-0 l-md-0 translate-middle-md-none'>
            <Logo width={210} href="/"></Logo>
          </div>
          <nav className='flex-grow-1 flex-lg-grow-0'>
            {
              (w__screen >= breakpoints.md || showMenu) &&
              <NavLinks />
            }
            <NavFuncBtns />
          </nav>
        </div>
      </div>
    </header>
  );
}
