//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
import dataEmergency from '@/data/cart-emergency.json';
//== Functions =================================================================
import { useState, useEffect } from 'react';
import axios from 'axios';
import tokenDecoder from '@/context/token-decoder';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components ================================================================
import Head from 'next/head';
import Link from 'next/link';
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
import ProdCartTable from './ProdCartTable';
import HotelCartTable from './HotelCartTable';
import CrsCartTable from './CrsCartTable';
//== Styles =================================================================
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import CartPage from './cart/CartPage';
import FillingPage from './confirm/ConfirmPage';
import ConfirmPage from './confirm/ConfirmPage';

export default function BuyPage() {
  /**
   * 購買流程
   *  @type {[number, React.Dispatch<number>]} */
  const [buyPhase, setBuyPhase] = useState(1);

  /**
   * 跨 phase 儲存使用者購買資訊
   *  @type {[object[], React.Dispatch<object[]>]} */
  const [buyInfoPkg, setBuyInfoPkg] = useState({
    buyItems: [],
    coupons: [],
  });

  return (
    <>
      <Head>
        <title>{['購物車', '填寫付款資料', '確認付款'][buyPhase]} | Fundodo</title>
      </Head>
      <BuyProgress stage={buyPhase} />

      {buyPhase === 1 && <CartPage setBuyPhase={setBuyPhase} />}
      {buyPhase === 2 && <FillingPage setBuyPhase={setBuyPhase} />}
      {buyPhase === 3 && <ConfirmPage setBuyPhase={setBuyPhase} />}
    </>
  )
}
BuyPage.layout = BuyLayout;
