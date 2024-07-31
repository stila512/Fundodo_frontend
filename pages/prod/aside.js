import scss from '@/pages/prod/aside.module.scss';
import Image from 'next/image';
import btnChecked from '/public/prodPic/radio_button_checked.png'
import btn from 'public/prodPic/radio_button.png'
import arrow from 'public/prodPic/ep_arrow-up-bold.png'
import React from 'react';
import PriceFilter from './priceFilter';

export default function Aside() {
   
    return (
        <>
            <aside>
                <h2 className={[scss.mb, scss.font].join(' ')}>篩選</h2>
                <div className={scss.filters}>
                    <div className={scss.ractangle}>
                        <div className={scss.margin}>
                            <div className={scss.header}>
                                <h2 className={scss.font}>飼料分類</h2>
                                <div className={scss.arrow}><Image alt={arrow} width={17} height={17} src={arrow} /></div>
                            </div>
                            <button className={[scss.btn, scss.btnFont, scss.checked].join(' ')}><Image alt={btnChecked} width={24} height={24} src={btnChecked} />一般乾糧</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />無榖乾糧</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />一般凍乾</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />無榖凍乾</button><button className={[scss.btn, scss.btnFont].join(' ')}><Image width={15} height={15} src={btn} />功能配方</button><button className={[scss.btn, scss.btnFont].join(' ')}><Image width={15} height={15} src={btn} />處方飼料</button>
                        </div>
                    </div>
                    <div className={scss.ractangle}>
                        <div className={scss.margin}>
                            <div className={scss.header}>
                                <h2 className={scss.font}>適用年齡</h2>
                                <div className={scss.arrow}><Image alt={arrow} width={17} height={17} src={arrow} /></div>
                            </div>
                            <div className={['row', scss.gap].join(" ")}>
                                <button className={[scss.btnAge, scss.btnFont, 'col6'].join(" ")}>全齡</button>
                                <button className={[scss.btnAge, scss.btnFont, 'col6'].join(" ")}>幼犬</button>
                                <button className={[scss.btnAge, scss.btnFont, 'col6'].join(" ")}>成犬</button>
                                <button className={[scss.btnAge, scss.btnFont, 'col6', scss.checked].join(" ")}>高齡犬</button>
                            </div>
                        </div>
                    </div>
                    <div className={scss.ractangle}>
                        <div className={scss.margin}>
                            <div className={scss.header}>
                                <h2 className={scss.font}>價錢篩選</h2>
                                <div className={scss.arrow}><Image alt={arrow} width={17} height={17} src={arrow} /></div>
                            </div>
                            <PriceFilter />
                        </div>
                    </div>
                    <div className={scss.ractangle}>
                        <div className={scss.margin}>
                            <div className={scss.header}>
                                <h2 className={scss.font}>品牌</h2>
                                <div className={scss.arrow}><Image alt={arrow} width={17} height={17} src={arrow} /></div>
                            </div>
                            <button className={[scss.btn, scss.btnFont, scss.checked].join(' ')}><Image alt={btnChecked} width={24} height={24} src={btnChecked} />ZiwiPeak 巔峰</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />汪喵星球</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />法國皇家</button>
                            <button className={[scss.btn, scss.btnFont].join(' ')}><Image alt={btn} width={15} height={15} src={btn} />飼糧倉</button><button className={[scss.btn, scss.btnFont].join(' ')}><Image width={15} height={15} src={btn} />朝貢 조공</button><button className={[scss.btn, scss.btnFont].join(' ')}><Image width={15} height={15} src={btn} />小犬威利</button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
