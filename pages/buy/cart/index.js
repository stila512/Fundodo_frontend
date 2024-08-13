import BuyProgress from '@/components/buy/buyProgress';
import BuyLayout from '@/components/layout/buy';
import Head from 'next/head';
import ProdCartTable from './ProdCartTable';
import HotelCartTable from './HotelCartTable';
import CrsCartTable from './CrsCartTable';
import s from "./cart-page.module.scss";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [amtArr, setAmtArr] = useState([0, 0, 0]);
  // totalArr[0] | 商品總金額
  // totalArr[1] | 實付總金額
  /** @type {[number[], React.Dispatch<MyState>]} */
  const [totalArr, setTotalArr] = useState([0, 0]);

  const delivery_fee = 60;
  const discount = -10;

  useEffect(() => {
    setTotalArr([
      amtArr.reduce((sum, subtotal) => sum + subtotal, 0),
      amtArr.reduce((sum, subtotal) => sum + subtotal, delivery_fee + discount),
    ]);
  }, [amtArr]);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container mt-5">
        <ProdCartTable setAmount={setAmtArr} i_amt={0} />
        <HotelCartTable setAmount={setAmtArr} i_amt={1} />
        <CrsCartTable setAmount={setAmtArr} i_amt={2} />
        <div className='d-flex jc-end'>
        {/*//todo  */}
          <button className={["bg-primary tx-white", s.continueBtn].join(' ')}>繼續購物</button>
        </div>
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
        </article>
      </section>
    </>
  );
};

CartPage.layout = BuyLayout;
