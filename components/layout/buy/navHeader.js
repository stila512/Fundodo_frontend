import scss from '../navHeader.module.scss';
import Logo from '@/components/common/logo';

import NavFuncBtns from '../NavFuncBtns';

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
          <NavFuncBtns showCart={false} />
        </nav>
      </div>
    </header>
  );
}
