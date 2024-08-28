import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import scss from './prodSec.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import feed1 from '@/public/homePic/feed1.png';
import feed2 from '@/public/homePic/feed2.png';
import feed3 from '@/public/homePic/feed3.png';
import feed4 from '@/public/homePic/feed4.png';
import PdBg from '@/public/homePic/pd_bg.png';
import { FaArrowRight } from "react-icons/fa";

export default function ProdSec() {
  const prodTextRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 當10%的元素可見時觸發
    );

    if (prodTextRef.current) {
      observer.observe(prodTextRef.current);
    }

    return () => {
      if (prodTextRef.current) {
        observer.unobserve(prodTextRef.current);
      }
    };
  }, []);

  return (
    <section className={scss.bgWrapper}>
      <div className={scss.bg} style={{'--bg-image': `url(${PdBg.src})`}}>
        <div className="container">
          <div className={[scss.prodSec, "d-flex", "jc-between", "ai-center"].join(' ')}>
            <div className={scss.prodImgs}>
              <Image src={feed1} alt="" />
              <Image src={feed2} alt="" />
              <Image src={feed3} alt="" />
              <Image src={feed4} alt="" />
            </div>
            <div 
              ref={prodTextRef} 
              className={`${scss.prodText} ${isVisible ? scss.animate : ''}`}
            >
              <h3>狗狗的全部需求，一站式解決</h3>
              <FddBtn color='primary' href='#' className={scss.proBtn}>
                立即逛逛 <FaArrowRight />
              </FddBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}