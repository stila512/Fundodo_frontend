import React, {useState, useEffect} from 'react'
import scss from './addCart.module.scss';
import { RiCoupon3Line } from "react-icons/ri";
import Link from 'next/link';


export default function AddCart({original_price,sale_price, id}) {
  
  return (
   <>
    <div className={scss.cartBox}>
    <div className={scss.price}>
      <h2>NT$ {sale_price} </h2>
      <p> NT$ {original_price}</p>
    </div>
    <div className={scss.coupon}>
    <RiCoupon3Line />
      <p>專屬優惠券 NT$ 50</p>
    </div>
    <div className={scss.btns}>
      <button>
        立即購買
      </button>
      <button>
        加入購物車
      </button>
      <div>
      <Link href={`/course/play/1`} > Go to Course Video </Link>
      </div>
    </div>

    </div>
   </>
  )
}
