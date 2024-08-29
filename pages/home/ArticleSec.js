import React from 'react'
import FddBtn from '@/components/buttons/fddBtn';
import scss from './articleSec.module.scss';
import Image from 'next/image';
import artdog1 from '@/public/homePic/artdog2.png';
import AtBg from '@/public/homePic/at_bg.svg'
import Link from 'next/link';


export default function ArticleSec() {
  return (
    <>
    <section className={scss.bgWrapper}>
      <div className={scss.bg} style={{'--bg-image': `url(${AtBg.src})`}}>
      <div className='container'>
        <div className={scss.card_text}>
          <h2>最新文章</h2>
          <FddBtn color='tint3' outline href='/'>閱讀更多</FddBtn>
        </div>

        <div className={scss.cards}>
          <div className={scss.card}>
            <Image src={artdog1} className={scss.card_img} />
            <div className={scss.card_body}>
              <p>2024.06.18</p>
              <h3>寵物無線飲水機使用分享</h3>
              <h4>大概一年前，終於下定決心要買無線飲水機，爬了很多文做了功課之後，評估各種了條件，畢竟也不想買到一台用不到的機器。 最後我買的是PETK....</h4>
              <Link href="/" className={scss.link}>More</Link>
            </div>
          </div>
          <div className={scss.card}>
            <Image src={artdog1} className={scss.card_img} />
            <div className={scss.card_body}>
              <p>2024.06.18</p>
              <h3>寵物無線飲水機使用分享</h3>
              <h4>大概一年前，終於下定決心要買無線飲水機，爬了很多文做了功課之後，評估各種了條件，畢竟也不想買到一台用不到的機器。 最後我買的是PETK....</h4>
              <Link href="/" className={scss.link}>More</Link>
            </div>
          </div>
          <div className={scss.card}>
            <Image src={artdog1} className={scss.card_img} />
            <div className={scss.card_body}>
              <p>2024.06.18</p>
              <h3>寵物無線飲水機使用分享</h3>
              <h4>大概一年前，終於下定決心要買無線飲水機，爬了很多文做了功課之後，評估各種了條件，畢竟也不想買到一台用不到的機器。 最後我買的是PETK....</h4>
              <Link href="" className={scss.link}>More</Link>
            </div>
          </div>
          
        </div>


      </div>
      </div>
      </section>
    </>
  )
}
