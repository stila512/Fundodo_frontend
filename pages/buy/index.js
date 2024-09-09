//== Functions ==============================================================
import { useState, useEffect, useContext } from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
import { AuthContext } from '@/context/AuthContext';
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
  const { user: userPkg } = useContext(AuthContext);
  useEffect(() => {
    if (userPkg) setUID(userPkg.userId);
    else console.log("登入時限到了歐");
  }, [userPkg]);
  //====================== 會員偵測 END ====================================

  /**
   * 購買流程的階段代號：1 | 購物車 ; 2 | 填寫表單 ; 3 | 訂單確認
   *  @type {[number, React.Dispatch<number>]} */
  const [buyPhase, setBuyPhase] = useState(1);

  /** 訂購資料的格式 */
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
      ship_zipcode: 0,
      ship_shop: "",
      ship_address: "",
      ship_ps: ""
    },
    boughtItems: [
      {
        purchase_sort: "",
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
