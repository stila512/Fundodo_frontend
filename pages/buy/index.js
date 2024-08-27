//== Parameters =============================================================
import { apiBaseUrl } from '@/configs';
//== Functions ==============================================================
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components =============================================================
import Head from 'next/head';
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
//== Styles =================================================================
import FddBtn from '@/components/buttons/fddBtn';
import CartPage from './cart/CartPage';
import FillingPage from './fill-form/FillingPage';
import ConfirmPage from './confirm/ConfirmPage';

export default function BuyPage() {
  //===== 驗證登入狀態
  useAuthRedirect();


  /**
   * 購買流程
   *  @type {[number, React.Dispatch<number>]} */
  const [buyPhase, setBuyPhase] = useState(2);

  /**
   * 跨 phase 儲存使用者購買資訊
   *  @type {[object[], React.Dispatch<object[]>]} */
  const [buyInfoPkg, setBuyInfoPkg] = useState({
    buyItems: [],
    coupons: [],
  });



  const titleText = buyPhase ? ['', '購物車', '填寫付款資料', '確認付款'][buyPhase] : '購物車';

  return (
    <>
      <Head>
        <title>{titleText} | Fundodo</title>
      </Head>
      <BuyProgress stage={buyPhase} />

      {buyPhase === 1 &&
        <CartPage setBuyPhase={setBuyPhase} setBuyInfoPkg={setBuyInfoPkg} />}
      {buyPhase === 2 &&
        <FillingPage setBuyPhase={setBuyPhase} setBuyInfoPkg={setBuyInfoPkg} />}
      {buyPhase === 3 &&
        <ConfirmPage setBuyPhase={setBuyPhase} />}
    </>
  )
}
BuyPage.layout = BuyLayout;
