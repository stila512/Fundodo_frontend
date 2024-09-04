//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect } from 'react';
import tokenDecoder from '@/context/token-decoder';
import axios from 'axios';
//== Components ================================================================
import DefaultLayout from '@/components/layout/default';
import Head from 'next/head';
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import s from '../confirm/confirm.module.scss';

export default function ReturnPage() {
  const shipWayOf = {
    CVS: '超商取貨',
    DLV: '宅配到府'
  };
  const payWayOf = {
    EC: '綠界線上付款',
    LINE: 'LINE PAY'
  };

  /**
     * user ID
     *  @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(0);

  /**
     * user ID
     *  @type {[object, React.Dispatch<object>]} */
  const [orderInfo, setOrderInfo] = useState(null);


  //============================================================//
  //=============== useEffect 區
  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { userId } = tokenDecoder();

    if (userId && userId > 0) setUID(userId);
    else console.log("是不是登出惹？userId: ", userId);
  }, []);
  //===== 以會員 ID 索取購物車資料，建構購物車初始資料
  useEffect(() => {
    if (!uID || uID === 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/order/${uID}?all=0`, { cancelToken: source.token })
      .then(res => setOrderInfo(res.data.results))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
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

    return () => source.cancel("API 請求已被臨時取消");
  }, [uID])

  return (
    <>
      <Head>
        <title>交易完成 | Fundodo</title>
      </Head>
      <div className="container pt-5">
        <div className={["row jc-center", s.row].join(' ')}>
          <div className="col-12 col-lg-7">
            <table className={s.table}>
              <thead>
                <tr className='bg-tint5'>
                  <th className='py-3'>付款與寄送資訊</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {orderInfo &&
                    <td className="d-flex flex-c flex-lg-r w-100">
                      <div className='p-3 flex-grow-1'>
                        <p>付款方式：{payWayOf[orderInfo.pay_thru]}</p>
                        <p>配送方式：{shipWayOf[orderInfo.ship_thru]}</p>
                      </div>
                      <div className='p-3 flex-grow-1'>
                        <p>收件人：{orderInfo.addressee}</p>
                        <p>聯絡電話：{orderInfo.tel}</p>
                        <p>電子信箱：{orderInfo.email}</p>
                        <p>收件郵遞區號：{orderInfo.ship_zipcode}</p>
                        <p>收件完整地址：{orderInfo.ship_address}</p>
                        <p>收件備註：{orderInfo.ship_ps}</p>
                      </div>
                    </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-7">
            <div className="hstack jc-center gap-5">
              <FddBtn color='primary' pill={false} outline href='/member'>
                前往我的訂單
              </FddBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ReturnPage.layout = DefaultLayout;
