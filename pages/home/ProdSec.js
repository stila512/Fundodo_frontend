import React from 'react';
import Image from 'next/image';
import scss from  './prodSec.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import feed1 from '@/public/homePic/feed1.png';
import feed2 from '@/public/homePic/feed2.png';
import feed3 from '@/public/homePic/feed3.png';
import feed4 from '@/public/homePic/feed4.png';
import { FaArrowRight } from "react-icons/fa";

export default function ProdSec() {
  return (
    <>
      <div className="container" >
        <div className={[scss.prodSec, "d-flex", "jc-between", "ai-center"].join(' ')}>
          <div className={scss.prodImgs}>
            <Image src={feed1} alt="" />
            <Image src={feed2} alt="" />
            <Image src={feed3} alt="" />
            <Image src={feed4} alt="" />

          </div>
          <div className={scss.prodText}>
            <h3>狗狗的全部需求，一站式解決</h3>
            <FddBtn  color='primary' href='#' className={scss.proBtn}>
              立即逛逛 <FaArrowRight />
            </FddBtn>
          </div>
        </div>
      </div>
    </>
  );
}
