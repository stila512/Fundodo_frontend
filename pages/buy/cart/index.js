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
import s from "./cart-page.module.scss";
import emptyCart from '@/public/cart/dog-in-cart.jpg';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';

export default function CartPage() {
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(0);

  const [cartPkg, setCartPkg] = useState({
    PD: [],
    CR: [],
    HT: []
  });

  // 三台購物車各自的刪除狀態紀錄
  /** @type {[ boolean[][], React.Dispatch<boolean[][]> ]} */
  const [itemStateArr, setItemStateArr] = useState([[], [], []]);

  // 三台購物車各自的總金額
  const [amtArr, setAmtArr] = useState([0, 0, 0]);

  // 三台購物車合算的總金額
  // totalArr[0] | 商品總金額
  // totalArr[1] | 實付總金額
  const [totalArr, setTotalArr] = useState([0, 0]);

  const delivery_fee = 60;
  const discount = -10;

  //===== 驗證登入狀態
  useAuthRedirect();
  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { userId } = tokenDecoder();
    setUID(userId);
  }, [])
  //===== 以會員 ID 索取購物車資料
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

        setCartPkg(
          {
            PD: PD_pkg,
            HT: HT_pkg,
            CR: CR_pkg,
          }
        );

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
  //===== 計算總購物車總金額
  useEffect(() => {
    setTotalArr([
      amtArr.reduce((sum, subtotal) => sum + subtotal, 0),
      amtArr.reduce((sum, subtotal) => sum + subtotal, delivery_fee + discount),
    ]);
  }, [amtArr]);

  const isEmpty = !(cartPkg.CR || cartPkg.HT || cartPkg.CR)
    || !itemStateArr.reduce(
      (indicator, currentArr) => indicator || currentArr.some(v => v),
      false);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
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
        {isEmpty &&
          <h2 className='tx-shade4 tx-center' style={{ marginBlock: '8rem' }}>
            購物車現在空無一物
          </h2>}
        <div className='d-flex jc-end'>
          <FddBtn color='primary' pill={false} href='/prod'>
            繼續購物
          </FddBtn>
        </div>
        {isEmpty ||
          <article className={['row', s.orderInfo].join(' ')}>
            <div className="col-12 col-lg-8">
              <div className="bg-tint3 p-3 h-100">
                <h3>這裡要擺優惠券</h3>
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
                    <td>NT ${delivery_fee}</td>
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
          </article>}
        {isEmpty && <div className='img-wrap-w100' style={{ width: '60vw' }}>
          <Image src={emptyCart} alt="empty cart" width={0} height={0} />
        </div>}
      </section>
    </>
  );
};

CartPage.layout = BuyLayout;
