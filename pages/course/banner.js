import React from 'react'
import Image from 'next/image';
import scss from './banner.module.scss';
import dog from "@/public/homePic/whitedog.png"

export default function Banner() {

  return (
    <>
      <div className="row">
        <div className="d-none d-md-block">
          <div className={scss.banner}>
            <Image src={dog} className='' alt='banner'/>
            <h2>狗的課程</h2>
          </div>
        </div>
      </div>

      
    </>
  );
}
