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
      <main className={scss.ForumMemberInfo}>
        <div className="col-4"></div>
        <div className={`${scss.midarea} col-5`}>
          <div className={scss.midtext}>
            <div className={scss.area1}>頭像上傳 <div className={scss.avatarPic}><Image className="imgWrap" src={avatarPic} alt="Image" /></div></div>
            <div className={scss.area2}>暱稱 <input placeholder="討論區暱稱"></input></div>
            <div className={scss.area3}>性別
              <div className={scss.genderRadio}>
                <input type="radio" name="gender" value="male"></input>
                <label for="male"><Image className="imgWrap" src={radio} alt="Image" />先生</label>
                <input type="radio" name="gender" value="female"></input>
                <label for="male"><Image className="imgWrap" src={radio} alt="Image" />女士</label>
              </div>
            </div>
            <div className={scss.area4}>生日
              <div><label for="birthday"></label>
                <input type="month" id="birthday" name="birthday" min="1900-01" max="2023-12" required></input>
              </div>
            </div>
            <div className={scss.area5}>
              所在地
                <div className={`${scss.area5-2} px-2`}>
                  <select className={`mx-2`}>
                    <option>城市</option>
                  </select>
                  <select>
                    <option>地區</option>
                  </select>
                </div>
            </div>
            <div className={scss.area6}>有效文章 <p>3篇</p></div>
            <div className={scss.area7}>自我介紹
                <textarea placeholder="如活潑、安靜、友善等..."></textarea>
            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <button className={scss.btn1}>編輯資料</button>
              <button className={scss.btn2}>確認送出</button>
            </div>
          </div>
        </div>
        <div className="col-5">
        <SideText></SideText>
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
