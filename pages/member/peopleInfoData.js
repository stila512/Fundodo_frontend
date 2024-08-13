import { useState, useEffect } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import Link from 'next/link';

export default function PeopleInfoData() {
  return (
    <>
      <main className={scss.PeopleInfoDataContainer}>
        <div className="col-1 col-lg-4"></div>
        <div className={`${scss.midarea} col-12 col-lg-5`}>
          <div className={`${scss.midtext}`}>
          <div className={`${scss.area2} `}>Email <p>example@gmail.com <span>沒收到驗證信?</span></p></div>
            <div className={scss.area3}>姓名<p>小廢材</p></div>
            <div className={scss.area4}>性別
              <div className={scss.genderRadio}>
                <p>先生</p>
              </div>
            </div>
            <div className={scss.area5}>生日
              <div><label html="birthday"></label>
                1999/9/9
              </div>
            </div>
            <div className={scss.area6}>行動電話 <p>0912345678</p></div>
            <div className={scss.area7}>聯絡地址
              <div className={scss.address}>
                桃園市中壢區聖德基督
              </div>

            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <Link href="/member/peopleInfo"><button className={scss.btn1}>編輯資料</button></Link>
              <button className={scss.btn2}>確認送出</button>
            </div>
          </div>
        </div>
        <div className="col-5 my-5  d-none d-lg-block">
        <SideText></SideText>
        </div>
      </main>
    </>
  );
}
PeopleInfoData.layout = DefaultLayout;
