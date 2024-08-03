import scss from './detailGroup.module.scss'
import Image from 'next/image'
import prodImg from '/public/prodPic/Container.png';
import mini1 from '/public/prodPic/1.png';
import mini2 from '/public/prodPic/2.png';
import mini3 from '/public/prodPic/3.png';

export default function DetailGroup() {
    return (
        <>
            <div className={[scss.detailGroup]}>
                <div className={[scss.imgGroup]}>
                    <div>
                        <Image src={prodImg} />
                    </div>
                    <div className={"dFlex gap3 mt3"}>
                        <div>
                            <Image src={mini1} />
                        </div>
                        <div>
                            <Image src={mini2} />
                        </div>
                        <div>
                            <Image src={mini3} />
                        </div>
                    </div>
                </div>
                <div className={[scss.aside]}>
                    <h3 className='mb5'>幼犬 經典系列乾糧 - 羊肉 (聰明成長配方)</h3>
                    <hr className='bgPrimary' />
                    <div className={scss.btnGroup}>
                        <p>規格</p>
                        <div className='dFlex gap3'>
                            <button className={scss.btnPrimary}>雞肉</button>
                            <button className={scss.btnUnChecked}>牛肉</button>
                            <button className={scss.btnDisable}>羊肉</button>
                        </div>
                    </div>
                    <div className={scss.btnGroup}>
                        <p>容量</p>
                        <div className='dFlex gap3'>
                            <button className={scss.btnPrimary}>100g</button>
                            <button className={scss.btnUnChecked}>200g</button>
                            <button className={scss.btnUnChecked}>300g</button>
                        </div>
                    </div>
                    <hr className={[scss.mt, 'bgPrimary'].join(' ')} />
                    <div className={scss.priceGroup}>
                        <span className={scss.price}>NT$680</span>
                        <span className={scss.originPrice}>NT$1,250</span>
                    </div> 

                </div>
            </div>
        </>
    )
}
