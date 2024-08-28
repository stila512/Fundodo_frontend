import React from 'react';
import Image from 'next/image';
import scss from './hero.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import dog1 from '@/public/homePic/dog1.png';
import dog2 from '@/public/homePic/dog2.png';
import dog3 from '@/public/homePic/dog3.png';
import dogs from '@/public/homePic/dogs.png';
import HeroBg from '@/public/homePic/hero_bg.svg'



export default function Hero() {
  return (
    <>
      <div className="container">
        <main>
          <section className={[scss.hero, "d-flex", "jc-between", "ai-center"].join(' ')}>
            <Image
              src={HeroBg}
              alt="Background"
              layout="fill"
              quality={100}
            />
            <div className={scss.hero_text}>
              <h1>專屬毛小孩的幸福</h1>
              <p>
                提供頂級狗糧、各式用品、專業寵物照顧線上課程和優質住宿服務，
                <br />
                滿足您愛犬的所有需求。
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
            <div className={scss.hero_image}>
              <Image src={dogs} layout="responsive" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
