import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import mdi_coupon from '@/public/memberPic/mdi_coupon.svg';
import mdi_dog from '@/public/memberPic/mdi_dog.svg';
import mdi_heart from '@/public/memberPic/mdi_heart.svg';
import mdi_list from '@/public/memberPic/mdi_list.svg';
import mdi_lock from '@/public/memberPic/mdi_lock.svg';
import mdi_user from '@/public/memberPic/mdi_user.svg';
import SideText from '@/components/member/SideText';

export default function PeopleInfo() {
  return (
    <>
      <main className={scss.PeopleInfoContainer}>
        <div className="col-4"></div>
        <div className={scss.midarea}>
          <div className={scss.midtext}>
            <div className={scss.area1}>頭像 <div className={scss.avatarPic}><Image className="imgWrap" src={avatarPic} alt="Image" /></div></div>
            <div className={scss.area2}>Email <p>example@gmail.com <span>沒收到驗證信?</span></p></div>
            <div className={scss.area3}>姓名 <input placeholder="姓名"></input></div>
            <div className={scss.area4}>性別
              <div className={scss.genderRadio}>
                <input type="radio" name="gender" value="male"></input>
                <label for="male"><Image className="imgWrap" src={radio} alt="Image" />先生</label>
                <input type="radio" name="gender" value="female"></input>
                <label for="male"><Image className="imgWrap" src={radio} alt="Image" />女士</label>
              </div>
            </div>
            <div className={scss.area5}>生日
              <div><label for="birthday"></label>
                <input type="month" id="birthday" name="birthday" min="1900-01" max="2023-12" required></input>
              </div>
            </div>
            <div className={scss.area6}>行動電話 <input placeholder="Please enter"></input></div>
            <div className={scss.area7}>聯絡地址
              <div className={scss.address}>
                <div className={scss.addressTOP}>
                  <select>
                    <option>城市</option>
                  </select>
                  <select>
                    <option>地區</option>
                  </select>
                </div>
                <input placeholder="詳細地址"></input>
              </div>

            </div>
          </div>
          <div className={scss.botarea}><button>確認送出</button></div>
        </div>
        {/* <div className={scss.sideText}> */}
        <SideText></SideText>
        {/* <div className={scss.sideText}>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_user} alt="Image" />會員管理</div>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_dog} alt="Image" />狗狗管理</div>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_list} alt="Image" />訂單查詢</div>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_lock} alt="Image" />修改密碼</div>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_heart} alt="Image" />我的收藏</div>
          <div className={scss.icon}><Image className="imgWrap" src={mdi_coupon} alt="Image" />優惠卷</div>
        </div> */}
        {/* </div> */}
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
