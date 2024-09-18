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
import ProdCartTable from './TableProd';
import HotelCartTable from './TableHotel';
import CrsCartTable from './TableCrs';
//== Styles =================================================================
import s from "./cart-page.module.scss";
import emptyCart from '@/public/cart/dog-in-cart.jpg';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';

export default function CartPage() {
  //=============== useState 區
  //=============== user ID ====================================================
  /**
   * user ID
   *  @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(0);

  //=============== coupon =====================================================
  // 遠目之 todo: 若折數型的優惠券有兩張以上，此機制皆會以原價為基數；而非作連續相乘
  // 若要解決此困境，有個想法是：將 cpList 依折數型、折抵型分為兩個陣列

  /**
   * 優惠券 info
   *  @type {[object, React.Dispatch<object>]} */
  const [cpList, setCpList] = useState([]);
  /**
   * 優惠券折扣金額
   *   @type {[number, React.Dispatch<number>]} */
  const [couponDc, setCouponDc] = useState([]);
  /**
   * 優惠券啟用狀態
   *   @type {[object, React.Dispatch<object>]} */
  const [cpState, setCpState] = useState([]);

  /**
   * 總折扣金額
   * @type {[number, React.Dispatch<number>]} */
  const [discount, setDiscount] = useState(0);

  /**
   * 總運費
   *  @type {[number, React.Dispatch<number>]} */
  const [dlvFee, setDlvFee] = useState(0);

  //=============== cart items =================================================
  /**
   * 購物車資料
   *  @type {[object, React.Dispatch<object>]} */
  const [cartPkg, setCartPkg] = useState({ PD: [], HT: [], CR: [] })

  // 三台購物車各自的刪除狀態紀錄
  /** @type {[ boolean[][], React.Dispatch<boolean[][]> ]} */
  const [itemStateArr, setItemStateArr] = useState([[], [], []]);

  // 三台購物車各自的總金額
  const [amtArr, setAmtArr] = useState([0, 0, 0]);

  // 三台購物車合算的總金額
  // totalArr[0] | 商品總金額
  // totalArr[1] | 實付總金額
  const [totalArr, setTotalArr] = useState([0, 0]);

  //=============== useState 區 END
  //============================================================//
  //=============== useEffect 區

  //===== 驗證登入狀態
  useAuthRedirect();
  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { userId } = tokenDecoder();
    setUID(userId);
  }, [])
  //===== 以會員 ID 索取購物車資料，建構購物車初始資料
  useEffect(() => {
    if (uID === 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/cart/${uID}`, { cancelToken: source.token })
      .then(res => {
        // 略過將之前被刪除的購物車項目
        //===== 可以避免購物車在回復刪除階段時，將重複品項救回
        const dataPkg = res.data.result;
        const PD_pkg = dataPkg.PD ? dataPkg.PD.filter(item => !item.deleted_at) : [];
        const HT_pkg = dataPkg.HT ? dataPkg.HT.filter(item => !item.deleted_at) : [];
        const CR_pkg = dataPkg.CR ? dataPkg.CR.filter(item => !item.deleted_at) : [];

        setCartPkg({ PD: PD_pkg, HT: HT_pkg, CR: CR_pkg, });

        // 有商品就預設運費 60 元
        if (PD_pkg.length > 0) setDlvFee(60);

        // 表列每個購物車項目是否被（軟）刪除的狀態
        setItemStateArr([
          Array(PD_pkg.length).fill(true),
          Array(HT_pkg.length).fill(true),
          Array(CR_pkg.length).fill(true),
        ]);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        console.log("未得到如預期的回應，已啟用備援資料");
        setCartPkg(dataEmergency);
        if (err.response) {
          //status != 2XX
          console.error(err.response.data.message);
        } else if (err.request) {
          // 伺服器沒有回應
          console.log("伺服器沒有回應，請檢查伺服器狀態");
        } else {
          console.log("未知的錯誤情形");
          console.log(err);
        }
      });

    return () => {
      //取消 API request
      // 主要在為了在 API 還沒跑完的時間點，使用者就離開頁面的情況
      // 避免 API 無法正常結束
      source.cancel("API 請求已被臨時取消");
    }
  }, [uID])

  //===== 以會員 ID 索取優惠券資料
  useEffect(() => {
    //0 | 預設值；null | token 解譯失敗
    if (!uID) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/coupon/${uID}`, { cancelToken: source.token })
      .then(res => {
        // 略過將之前被刪除的購物車項目
        //===== 可以避免購物車在回復刪除階段時，將重複品項救回
        setCpList(res.data.result.usableArr);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        console.log("未得到如預期的回應，已啟用備援資料");
        setCpList([]);
        if (err.response) {
          //status != 2XX
          console.error(err.response.data.message);
        } else if (err.request) {
          // 伺服器沒有回應
          console.log("伺服器沒有回應，請檢查伺服器狀態");
        } else {
          console.log("未知的錯誤情形");
          console.log(err);
        }
      });

    return () => {
      //取消 API request
      // 主要在為了在 API 還沒跑完的時間點，使用者就離開頁面的情況
      // 避免 API 無法正常結束
      source.cancel("API 請求已被臨時取消");
    }
  }, [uID])

  //===== 以優惠券資料建立初始狀態
  useEffect(() => {
    if (cpList.length === 0 || !(cartPkg.CR || cartPkg.HT || cartPkg.CR)) return;

    // 預設皆不啟動
    const initState = Array(cpList.length).fill(0);
    let verified = initState;
    ['CR', 'HT', 'CR'].forEach(sort => {
      if (cartPkg[sort].length === 0) {
        verified = verified.map((s, i_cp) => {
          if (cpList[i_cp].scope_from === sort || cpList[i_cp].scope_to === sort)
            return -1;
          else
            return s;
        });
      }
    });
    setCpState(verified);
    // setCpState(initState);
  }, [cpList, cartPkg])

  //===== 以優惠券狀態更新折扣金額
  const handleDiscount = (coupon, amt_base) => {
    const { max_discount, discount } = coupon;
    const price_cut = Number(discount);

    let cut = 0;
    if (price_cut > 1) {
      cut = price_cut;
    } else {
      cut = Math.floor(amt_base * (1 - price_cut));
    }
    return max_discount ? Math.min(cut, max_discount) : cut;
  }
  useEffect(() => {
    const dcArr = cpList.map(coupon => {
      let delta = 0
      switch (coupon.scope_to) {
        case null:
          delta = handleDiscount(coupon, totalArr[0]);
          break;
        case 'PD':
          if (amtArr[0] === 0) break;
          delta = handleDiscount(coupon, amtArr[0]);
          break;
        case 'HT':
          if (amtArr[1] === 0) break;
          delta = handleDiscount(coupon, amtArr[1]);
          break;
        case 'CR':
          if (amtArr[2] === 0) break;
          delta = handleDiscount(coupon, amtArr[2]);
          break;
        default:
          break;
      }
      return delta;
    });
    setCouponDc(dcArr);
  }, [amtArr]);

  //===== 結算優惠券折扣總金額
  useEffect(() => {
    if (cpState.some(v => v)) {
      const tot = couponDc.reduce((acc, cur, j) => {
        if (cpState[j] === 1) return acc + cur;
        else return acc
      }, 0);
      setDiscount(0 - tot);
    } else {
      setDiscount(0);
    }

  }, [cpState, couponDc]);

  //===== 計算總購物車總金額
  useEffect(() => {
    setTotalArr([
      amtArr.reduce((sum, subtotal) => sum + subtotal, 0),
      amtArr.reduce((sum, subtotal) => sum + subtotal, dlvFee + discount),
    ]);
  }, [amtArr, dlvFee, discount]);

  //=============== useEffect 區 END
  //============================================================//

  const colorIndicator = (j) => {
    switch (cpState[j]) {
      case 0:
        return 'shade2';
      case 1:
        return 'warning';
      case -1:
        return 'muted';
      default:
        return 'error';
    }
  }

  const handleCpBtn = j => {
    switch (cpState[j]) {
      case 0:
        setCpState(cpState.map((v, i) => i === j ? 1 : v))
        return;
      case 1:
        setCpState(cpState.map((v, i) => i === j ? 0 : v))
        return;
      case -1:
        setCpState(cpState.map(v => v))
        return;
      default:
        setCpState(cpState.map(v => v))
        return;
    }
  }


  /** 購物車是否全空 */
  const isEmpty = !(cartPkg.CR || cartPkg.HT || cartPkg.CR)
    || !itemStateArr.reduce(
      (indicator, currentArr) => indicator || currentArr.some(v => v),
      false);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      {isEmpty || <>
        <BuyProgress stage={1} />
        <section className="container mt-5">
          <ProdCartTable
            data={cartPkg.PD}
            itemStateArr={itemStateArr[0]}
            setItemStateArr={setItemStateArr}
            setAmount={setAmtArr}
          />
          <HotelCartTable
            data={cartPkg.HT}
            itemStateArr={itemStateArr[1]}
            setItemStateArr={setItemStateArr}
            setAmount={setAmtArr}
          />
          <CrsCartTable
            data={cartPkg.CR}
            itemStateArr={itemStateArr[2]}
            setItemStateArr={setItemStateArr}
            setAmount={setAmtArr}
          />
          <div className='d-flex jc-end'>
            <FddBtn color='primary' pill={false} href='/prod'>
              繼續購物
            </FddBtn>
          </div>
          <article className={['row', s.orderInfo].join(' ')}>
            <div className="col-12 col-lg-8">
              <div className="bg-secondary p-3 h-100">
                <div className="hstack jc-between mb-3">
                  <h3>
                    {cpList.length > 0
                      ? "所有可使用的優惠券"
                      : "沒有可使用的優惠券"}</h3>
                  <FddBtn color='tint3' size='sm' href='/member/coupon'>查看我的優惠券</FddBtn>
                </div>
                <div className="hstack flex-wrap gap-1 jc-between">
                  {cpList.map((coupon, i_cp) => (
                    <FddBtn
                      key={coupon.code}
                      size='sm'
                      color={colorIndicator(i_cp)}
                      callback={() => handleCpBtn(i_cp)}
                    >
                      <p className='tx-left'>{coupon.name}</p>
                      <p className='tx-primary' style={{ position: 'absolute', top: '0.5rem', right: '1rem' }}>{coupon.code}</p>
                      <p>{coupon.desc}</p>
                    </FddBtn>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <table>
                <thead>
                  <tr>
                    <th>訂單資訊</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>商品金額</th>
                    <td>NT ${totalArr[0]}</td>
                  </tr>
                  <tr>
                    <th>運費</th>
                    <td>NT ${dlvFee}</td>
                  </tr>
                  <tr>
                    <th>優惠折扣</th>
                    <td>NT ${discount}</td>
                  </tr>
                  <tr>
                    <th>結帳金額</th>
                    <td>NT ${totalArr[1]}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Link className={s.payBtn} href='/buy/confirm'>前往結帳</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </>}
      {isEmpty && <section className="container pt-3">
        <h4 className='my-5 tx-lg tx-shade3 tx-center'>現在購物車空無一物</h4>
        <div className='hstack jc-around'>
          <FddBtn color='tint1' size='sm' href='/course'>來去逛逛寵物商城</FddBtn>
          <FddBtn color='tint1' size='sm' href='/course'>來去逛逛寵物旅館</FddBtn>
          <FddBtn color='tint1' size='sm' href='/course'>來去逛逛寵物課程</FddBtn>
        </div>
        <div className='img-wrap-w100 mx-auto' style={{ width: '40vw' }}>
          <Image src={emptyCart} alt="empty cart" width={0} height={0} />
        </div>
      </section>}
    </>
  );
};

CartPage.layout = BuyLayout;
