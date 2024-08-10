import React from 'react'
import Image from 'next/image';
import crsInfo from "@/public/coursePic/crsinfo.png"
import scss from './summary.module.scss';


export default function Summary() {
    return (
        <>
            <div className='container'>
                    <section className={scss.content}>
                        <div className={scss.title}>
                            <h3>與狗兒的線上遊戲課程，一起練習合作遊戲，加深彼此的信任關係！</h3>
                            <p>嗅聞玩具給了、益智玩具破解了、啃咬零食啃完了，狗兒還是眼神發光的看著你？<br />
                             各種才藝練都練習了，感覺靈感枯竭，江郎才盡？ <br />
                                看著網路上其他狗兒都好厲害，但我家狗兒什麼都練不起來，感覺好挫折？</p>
                        </div>
                        <Image src={crsInfo} />
                        <div className='d-flex jc-center'>
                            <button className={scss.btn} >更多介紹</button>
                        </div>
                    </section>
               
            </div>

        </>

    )
}
