import React from 'react'
import scss from './recommend.module.scss'
import Image from 'next/image'
import FddBtn from '@/components/buttons/fddBtn'
import recProd from '/public/prodPic/prod.png';
export default function Recommend() {
  return (
    <>
      <div className={['mt-3', scss.recommend].join(' ')}>
        <h3 className={scss.h3}>您可能也會喜歡</h3>
        <div className={[scss.cardGrid, 'row', 'gap-3'].join(' ')}>
          <div className={[scss.card, 'col-5'].join(' ')}>
            <div className={[scss.img, 'img-wrap-w100'].join(' ')}>
              <Image src={recProd} width={0} height={0}/>
            </div>
            <div className={scss.aside}>
              <div className='tx-default'>Oh!Hi!YO無糖優格條 (多種口味)</div>
              <div>NT$99</div>
              <FddBtn href='#' size={"sm"}>我要購買</FddBtn>
            </div>
          </div>
          <div className={[scss.card, 'col-5'].join(' ')}>
            <div className={[scss.img, 'img-wrap-w100'].join(' ')}>
              <Image src={recProd} width={0} height={0} objectFit='cover'/>
            </div>
            <div className={scss.aside}>
              <div className='tx-default'>Oh!Hi!YO無糖優格條 (多種口味)</div>
              <div>NT$99</div>
              <FddBtn className='text-nowrap' href='#' size={"sm"}>我要購買</FddBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
