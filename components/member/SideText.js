import Image from 'next/image';
import mdi_coupon from '@/public/memberPic/mdi_coupon.svg';
import mdi_dog from '@/public/memberPic/mdi_dog.svg';
import mdi_heart from '@/public/memberPic/mdi_heart.svg';
import mdi_list from '@/public/memberPic/mdi_list.svg';
import mdi_lock from '@/public/memberPic/mdi_lock.svg';
import mdi_user from '@/public/memberPic/mdi_user.svg';
import { IoMdPerson, IoIosPaper } from 'react-icons/io';
import { MdLock } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import scss from './side.module.scss';
import Link from 'next/link';

export default function SideText({activeIndex = 0}) {
  return (
    <div className={scss.sideText}>
      <div className={[scss.menuItem, activeIndex === 0 ? scss.active : ''].join(' ')}>
        <div className={scss.mainItem}>
          <div className={scss.reactIcon}>
            <IoMdPerson />
          </div>
          <span>會員管理</span>
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
        {/* <Image className={scss.icon} src={mdi_list} alt="訂單查詢" /> */}
        <span>訂單查詢</span>
      </div>
      <div className={[scss.menuItem, activeIndex === 3 ? scss.active : ''].join(' ')}>
        <div className={scss.reactIcon}>
          <MdLock />
        </div>
        <Link href="/member/ChangePassword"><span>修改密碼</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 4 ? scss.active : ''].join(' ')}>
        <div className={scss.reactIcon} style={{fontSize: '20px'}}>
          <FaHeart />
        </div>
        <Link href='/prod/list/favoriteProd'><span>我的收藏</span></Link>
      </div>
      <div className={[scss.menuItem, activeIndex === 5 ? scss.active : ''].join(' ')}>
        <Image className={scss.icon} src={mdi_coupon} alt="優惠卷" />
        <Link href="/member/coupon"><span>優惠卷</span></Link>
      </div>
    </div>
  );
}