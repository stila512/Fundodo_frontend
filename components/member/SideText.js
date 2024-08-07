import Image from 'next/image';
import mdi_coupon from '@/public/memberPic/mdi_coupon.svg';
import mdi_dog from '@/public/memberPic/mdi_dog.svg';
import mdi_heart from '@/public/memberPic/mdi_heart.svg';
import mdi_list from '@/public/memberPic/mdi_list.svg';
import mdi_lock from '@/public/memberPic/mdi_lock.svg';
import mdi_user from '@/public/memberPic/mdi_user.svg';
import scss from './side.module.scss';

export default function SideText() {
  return (
    <div className={`${scss.sideText}`}>
      <div className={scss.menuItem}>
        <div className={scss.mainItem}>
          <Image className={scss.icon} src={mdi_user} alt="會員管理" />
          <span>會員管理</span>
        </div>
        <div className={scss.subItems}>
          <div>基本資料</div>
          <div>討論區會員</div>
        </div>
      </div>
      <div className={scss.menuItem}>
        <Image className={scss.icon} src={mdi_dog} alt="狗狗管理" />
        <span>狗狗管理</span>
      </div>
      <div className={scss.menuItem}>
        <Image className={scss.icon} src={mdi_list} alt="訂單查詢" />
        <span>訂單查詢</span>
      </div>
      <div className={scss.menuItem}>
        <Image className={scss.icon} src={mdi_lock} alt="修改密碼" />
        <span>修改密碼</span>
      </div>
      <div className={scss.menuItem}>
        <Image className={scss.icon} src={mdi_heart} alt="我的收藏" />
        <span>我的收藏</span>
      </div>
      <div className={scss.menuItem}>
        <Image className={scss.icon} src={mdi_coupon} alt="優惠卷" />
        <span>優惠卷</span>
      </div>
    </div>
  );
}