//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components ================================================================
import DefaultLayout from '@/components/layout/default'
import SideText from '@/components/member/SideText';
import FddBtn from '@/components/buttons/fddBtn';
import Head from 'next/head';
//== Styles =================================================================
import s from './style.module.scss';

export default function OrderPage() {
  //*============================ 初始渲染：會員
  //===== 驗證登入狀態
  useAuthRedirect();

  const { user } = useContext(AuthContext);

  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);

  //===== 獲得登入的會員 ID
  useEffect(() => {
    if (user === null) return;
    const { userId } = user;
    setUID(userId ? userId : 0);
  }, [user]);


  //*============================ 初始渲染：訂單
  const [orderPkg, setOrderPkg] = useState([]);

  //===== 以會員 ID 索取訂單資料
  useEffect(() => {
    if (uID <= 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    axios.get(`${apiBaseUrl}/order/${uID}`, { cancelToken: source.token })
      .then(res => {
        setOrderPkg(res.data.result);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('索取會員訂單資料之請求已成功取消');
          return;
        }

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
  }, [uID]);

  return (
    <>
      <Head><title>我的訂單 | Fundodo</title></Head>
      <main className={['bg-tint5', s.main].join(' ')}>
        <div className="container">
          <div className="row jc-center">
            <div className="col-12 col-lg-8">
              <table className={s.table}>
                <caption><h2 className='pb-5'>訂單列表</h2></caption>
                <thead className='bg-shade4 tx-tint3'>
                  <tr>
                    <th className='px-5'>訂單狀態</th>
                    <th className='px-5'>訂單成立日期</th>
                    <th className='px-5'>付款方式</th>
                    <th className='px-5'>配送方式</th>
                    <th className='px-5'>訂單金額</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (orderPkg.length > 0)
                      ? orderPkg.map(order => (
                        <tr key={order.id}>
                          <td>已出貨</td>
                          <td>{order.created_at.split('T')[0].replace('-', '年').replace('-', '月')}日</td>
                          <td>{order.pay_thru === 'EC' ? "綠界線上付款" : "LINE PAY"}</td>
                          <td>{order.ship_thru === 'DLV' ? "宅配到府" : "超商取貨"}</td>
                          <td>{order.amount.toLocaleString()}</td>
                        </tr>
                      ))
                      : <tr><td colSpan={5}><h3>尚無歷史訂單</h3></td></tr>
                  }
                </tbody>
              </table>
            </div>
            <div className="col-12 col-lg-4 tx-right">
              <SideText title="我的訂單" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
OrderPage.layout = DefaultLayout;
