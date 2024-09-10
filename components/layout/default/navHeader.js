//== Parameters ================================================================
import { breakpoints } from '@/configs';
//== Functions =================================================================
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import useScreenWidth from '@/hooks/useScreenWidth';
//== Components ================================================================
import Logo from '@/components/common/logo';
import NavToggleBtn from '../NavToggleBtn';
import NavFuncBtns from '../NavFuncBtns';
import NavLinks from '../NavLinks';
//== Styles =================================================================
import scss from '../navHeader.module.scss';

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

  const { user } = useContext(AuthContext);
  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);
  //===== 會員權限
  /** @type {[number, React.Dispatch<number>]} */
  const [isAdmin, setIsAdmin] = useState(false);

  //===== 獲得登入的會員 ID & 判斷管理員登入
  useEffect(() => {
    //第一次載入，得到 undefined
    if (user === undefined) return;
    //第二次載入，得到 null
    if (user === null) return setUID(0);
    // 其他情況的提防
    if (typeof user !== 'object') return console.error('objcet "user" 出現了意料外的情形!!');

    setUID(user.userId);
    setIsAdmin(user.user_level >= 20)
  }, [user]);

  return (
    <header className={scss.header}>
      <div className='container h-100'>
        <div className={scss.headerMembrane}>
          <div className='d-block d-md-none flex-grow-1 flex-lg-grow-0'>
            <NavToggleBtn showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
          <div className='pos-a t-50 l-50 translate-middle pos-md-r t-md-0 l-md-0 translate-middle-md-none'>
            <Logo href="/" wrapClass={["img-wrap-w100", scss.logoWrap].join(' ')} />
          </div>
          <nav className='flex-grow-1 flex-lg-grow-0'>
            {
              (w__screen >= breakpoints.md || showMenu) && (
                <NavLinks
                  isAdmin={isAdmin}
                  toggleLinks={w__screen < breakpoints.md ? setShowMenu : () => { }}
                />)
            }
            <NavFuncBtns uID={uID} setUID={setUID} />
          </nav>
        </div>
      </div>
    </header>
  );
}
