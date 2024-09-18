import Image from 'next/image';
import mdi_coupon from '@/public/memberPic/mdi_coupon.svg';
import mdi_dog from '@/public/memberPic/mdi_dog.svg';
import { IoMdPerson, IoIosPaper } from 'react-icons/io';
import { MdLock } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import scss from './side.module.scss';
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";
import { useContext } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';

export default function SideText({ activeIndex = 0 }) {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // 呼叫登出函數
  };
  const showEnter = user ? user.user_level === 20 : false;
  return (
    <div className={scss.sideText}>
      {showEnter ?
        <div className={[scss.menuItem, activeIndex === 7 ? scss.active : ''].join(' ')}>
          <Image className={scss.icon} src={mdi_dog} alt="管理後台" />
          <Link href="/backend"><span>管理後台</span></Link>
        </div>
        : <></>
      }
      <div className={[scss.menuItem, scss.bigItem, activeIndex === 0 ? scss.active : ''].join(' ')}>
        <div className={scss.mainItem}>
          <div className={scss.reactIcon}>
            <IoMdPerson />
          </div>
          <span>會員中心</span>
        </div>
        <div className={scss.subItems}>
          <Link href="/member/peopleInfoData">基本資料</Link>
          <Link href="/member/ForumMemberInfo">討論區會員</Link>
        </div>
      </div>
      <div className={[scss.menuItem, activeIndex === 1 ? scss.active : ''].join(' ')}>
        <Image className={scss.icon} src={mdi_dog} alt="狗狗管理" />
        <Link href="/member/dogInfoData"><span>狗狗管理</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 2 ? scss.active : ''].join(' ')}>
        <div className={scss.reactIcon}>
          <IoIosPaper />
        </div>
        <Link href="/member/order"><span>訂單查詢</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 3 ? scss.active : ''].join(' ')}>
        <div className={scss.reactIcon}>
          <MdLock />
        </div>
        <Link href="/member/ChangePassword"><span>修改密碼</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 4 ? scss.active : ''].join(' ')}>
        <div className={scss.reactIcon} style={{ fontSize: '20px' }}>
          <FaHeart />
        </div>
        <Link href='/prod/list/favoriteProd'><span>我的收藏</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 5 ? scss.active : ''].join(' ')}>
        <Image className={scss.icon} src={mdi_coupon} alt="優惠卷" />
        <Link href="/member/coupon"><span>優惠卷</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 6 ? scss.active : ''].join(' ')} >
        <div className={scss.reactIcon}>
          <IoIosLogOut />
        </div><span onClick={handleLogout} style={{ cursor: 'pointer' }}>登出</span>
      </div>

    </div>
  );
}