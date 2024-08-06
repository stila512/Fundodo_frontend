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
    <div className={scss.sideText}>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_user} alt="Image" />會員管理</div>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_dog} alt="Image" />狗狗管理</div>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_list} alt="Image" />訂單查詢</div>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_lock} alt="Image" />修改密碼</div>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_heart} alt="Image" />我的收藏</div>
      <div className={scss.icon}><Image className="imgWrap" src={mdi_coupon} alt="Image" />優惠卷</div>
    </div>
  );
}