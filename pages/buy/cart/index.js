import BuyProgress from '@/components/buy/buyProgress';
import BuyLayout from '@/components/layout/buy';
import Head from 'next/head';
import ProdCartTable from './ProdCartTable';
import HotelCartTable from './HotelCartTable';
import CrsCartTable from './CrsCartTable';
import s from "./cart-page.module.scss";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import tokenDecoder from '@/context/token-decoder';
import dataEmergency from '@/data/cart-emergency.json';
import { apiBaseUrl } from '@/configs';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function CartPage() {
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(0);

  const [cartPkg, setCartPkg] = useState({
    PD: [],
    CR: [],
    HT: []
  });

  const [amtArr, setAmtArr] = useState([0, 0, 0]);

  // totalArr[0] | 商品總金額
  // totalArr[1] | 實付總金額
  /** @type {[number[], React.Dispatch<number[]>]} */
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
    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/cart/${uID}`)
      .then(res => setCartPkg(res.data.result))
      .catch(err => {
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
  }, [uID])
  //===== 計算總購物車總金額
  useEffect(() => {
    setTotalArr([
      amtArr.reduce((sum, subtotal) => sum + subtotal, 0),
      amtArr.reduce((sum, subtotal) => sum + subtotal, delivery_fee + discount),
    ]);
  }, [amtArr]);

  const isEmpty = !(cartPkg.CR || cartPkg.HT || cartPkg.CR);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container mt-5">
        {cartPkg.PD && <ProdCartTable data={cartPkg.PD} setAmount={setAmtArr} i_amt={0} />}
        {cartPkg.HT && <HotelCartTable data={cartPkg.HT} setAmount={setAmtArr} i_amt={1} />}
        {cartPkg.CR && <CrsCartTable data={cartPkg.CR} setAmount={setAmtArr} i_amt={2} />}
        {isEmpty && <h2 className='tx-shade4 tx-center' style={{ marginBlock: '8rem' }}>購物車現在空無一物</h2>}
        <div className='d-flex jc-end'>
          <Link href="/prod" className={["bg-primary tx-white", s.continueBtn].join(' ')}>繼續購物</Link>
        </div>
        {isEmpty ||
          <article className={s.orderInfo}>
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
          </article>}
      </section>
    </>
  );
};

CartPage.layout = BuyLayout;
