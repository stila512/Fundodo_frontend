//== Parameters ================================================================
import { breakpoints } from '@/configs';
//== Functions =================================================================
import { useEffect, useState } from 'react';
import useScreenWidth from '@/hooks/useScreenWidth';
//== Components ================================================================
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import scss from './hero.module.scss';
import dogs from '@/public/homePic/dogs.png';
import HeroBg from '@/public/homePic/hero_bg.svg'
import HeroMobileBg from '@/public/homePic/bg-mobile.png'



export default function Hero() {
  const screenWidth = useScreenWidth();
  const [w__screen, setW__screen] = useState(1920);

  useEffect(() => {
    setW__screen(screenWidth);
  }, [screenWidth]);

  return (
    <>
      <div className="container pt-0 pt-md-5">
        <main className='pt-0 pt-md-4'>
          <section className={scss.hero}>
            <div className={['img-wrap-w100', scss.bgWrap].join(' ')}>
              <Image
                src={w__screen >= breakpoints.md ? HeroBg : HeroMobileBg}
                alt="background decoration"
              />
            </div>
            <div className="row jc-between">
              <div className="col-12 col-md-5">
                <div className={scss.hero_text}>
                  <h1>專屬毛小孩的幸福</h1>
                  <p>
                    提供頂級狗糧、各式用品、專業寵物照顧線上課程<br />
                    和優質住宿服務，滿足您愛犬的所有需求。
                  </p>
                  <div className={scss.btns}>
                    <FddBtn color="primary" href="#">
                      現在購買
                    </FddBtn>
                    <FddBtn color='tint3' outline href="#">
                      立即詢問
                    </FddBtn>
                  </div>
                </div>
              </div>
              <div className="col-7 d-none d-md-block">
                <div className='img-wrap-w100'>
                  <Image src={dogs} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
