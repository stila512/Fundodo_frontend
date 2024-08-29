//== Parameters =============================================================
import { apiBaseUrl } from '@/configs';
//== Functions ==============================================================
import { useState, useEffect } from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import tokenDecoder from '@/context/token-decoder';
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
//== Styles =================================================================
import CartPage from './cart/CartPage';
import FillingPage from './fill-form/FillingPage';
import ConfirmPage from './confirm/ConfirmPage';

export default function BuyPage() {
  //====================== 會員偵測 ====================================
  //===== 驗證登入狀態
  useAuthRedirect();

  //===== user ID
  /**
     * user ID
     *  @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(0);
  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { userId } = tokenDecoder();

    if (userId && userId > 0) setUID(userId);
    else console.log("是不是登出惹？userId: ", userId);
  }, []);
  //====================== 會員偵測 END ====================================

  /**
   * 購買流程
   *  @type {[number, React.Dispatch<number>]} */
  const [buyPhase, setBuyPhase] = useState(1);


  const initBuyInfoPkg = {
    coupons: [],
    orderInfo: {
      user_id: 0,
      amount: 0,
      addressee: "",
      email: "",
      phone_num: "",
      pay_thru: "",
      ship_thru: "",
      ship_zipcode: "",
      ship_address: "",
    },
    boughtItems: [
      {
        purchase_sort: null,
        purchase_id: 0,
        purchase_price: 0,
        cart_id: 0,
        room_type: ''/* for Hotel only */
      }
    ],
  };
  /**
   * 跨 phase 儲存使用者購買資訊
   *  @type {[object[], React.Dispatch<object[]>]} */
  const [buyInfoPkg, setBuyInfoPkg] = useState(initBuyInfoPkg);




  return (
    <>
      <BuyProgress stage={buyPhase} />

      {buyPhase === 1 &&
        <CartPage
          userID={uID}
          setBuyPhase={setBuyPhase}
          setBuyInfoPkg={setBuyInfoPkg}
        />}
      {buyPhase === 2 &&
        <FillingPage
          userID={uID}
          setBuyPhase={setBuyPhase}
          setBuyInfoPkg={setBuyInfoPkg}
        />}
      {buyPhase === 3 &&
        <ConfirmPage
          setBuyPhase={setBuyPhase}
          buyInfoPkg={buyInfoPkg}
        />}
    </>
  )
}
BuyPage.layout = BuyLayout;
