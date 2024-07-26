import React from 'react';
import Image from 'next/image';
import style from '@/styles/style.module.scss';
import './homepage.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import feed1 from '@/public/homepagePic/feed1.png';
import feed2 from '@/public/homepagePic/feed2.png';
import feed3 from '@/public/homepagePic/feed3.png';
import feed4 from '@/public/homepagePic/feed4.png';

export default function Sec2() {
  return (
    <>
      <div className={style.container}>
        <div className="sec2">
          <div className="sec2Feeds">
          <Image  src={feed1} alt="" />
          <Image  src={feed2} alt="" />
          <Image  src={feed3} alt="" />
          <Image  src={feed4} alt="" />
    
          </div>
          <div className="sec2Content">
            <h3>狗狗的全部需求，一站式解決</h3>
            <FddBtn color='secondary' href='#'>
            立即逛逛
            </FddBtn>
          </div>
        </div>
      </div>
    </>
  );
}
