import React from 'react';
import Image from 'next/image';
import style from '@/styles/style.module.scss';
import hstyle from './homepage.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import dog1 from '@/public/homepagePic/dog1.png';
import dog2 from '@/public/homepagePic/dog2.png';
import dog3 from '@/public/homepagePic/dog3.png';

export default function Hero() {
  return (
    <>
      <div className={style.container}>
        <main>
          <section className={hstyle.hero}>
            <div className={hstyle.hero_text}>
              <h1>您的寵物，我們的關愛</h1>
              <p>
                提供頂級狗糧、各式用品、專業寵物照顧線上課程和優質住宿服務，
                <br />
                滿足您愛犬的所有需求。
              </p>
              <div className={hstyle.btns}>
                <FddBtn color="primary" href="#">
                  現在購買
                </FddBtn>
                <FddBtn className={hstyle.btn2} href="#">
                  立即詢問
                </FddBtn>
              </div>
            </div>
            <div className={hstyle.hero_image}>
              <Image className="imgWrap" src={dog1} alt="Hero Image" />
              <Image className="imgWrap" src={dog2} alt="Hero Image" />
              <Image className="imgWrap" src={dog3} alt="Hero Image" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
