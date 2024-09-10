//== Functions ==============================================================
import { useState, useEffect, useContext } from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
import { AuthContext } from '@/context/AuthContext';
//== Components ================================================================
import CartPage from './cart/CartPage';
import FillingPage from './fill-form/FillingPage';
import ConfirmPage from './confirm/ConfirmPage';
import Loading from '@/components/common/loading';

export default function BuyPage() {
  //=====初始化狀態
  const [isLoadingStage, setIsLoadingStage] = useState(true);

  //====================== 會員偵測 ====================================
  //===== 驗證登入狀態
  useAuthRedirect();

  const { user } = useContext(AuthContext);
  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);

  //===== 獲得登入的會員 ID & 判斷管理員登入
  useEffect(() => {
    //第一次載入，得到 undefined
    if (user === undefined) return;
    //第二次載入，得到 null
    if (user === null) return setUID(0);
    // 其他情況的提防
    if (typeof user !== 'object') return console.error('objcet "user" 出現了意料外的情形!!');

    setUID(user.userId);
    setIsLoadingStage(false);
  }, [user]);
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

  return isLoadingStage
    ? <Loading />
    : (<>
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
    </>)
}
BuyPage.layout = BuyLayout;
