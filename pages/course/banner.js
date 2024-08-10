import React from 'react'
import Image from 'next/image';
import scss from './banner.module.scss';
import dog from "@/public/homepagePic/whitedog.png"
import Sort from './sort';

export default function Banner() {
  return (
    <>
      <div className="row">
        <div className="d-none d-md-block">
          <div className={scss.banner}>
            <Image src={dog} className='' />
            <h2>狗的課程</h2>
          </div>
        </div>
      </div>

      <div className='d-flex jc-between ai-center'>
        <p>Home 狗狗課程</p>
        <div className="d-flex ai-center">
          <Sort />
        </div>
      </div>
    </>
  );
}
