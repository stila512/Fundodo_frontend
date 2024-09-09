//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components ================================================================
import DefaultLayout from '@/components/layout/default';
import Head from 'next/head';
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import s from './style.module.scss';

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
  const [uID, setUID] = useState(-1);

  /**
     * 訂單資料
     *  @type {[object, React.Dispatch<object>]} */
  const [orderInfo, setOrderInfo] = useState(null);

  //====================== 會員偵測 ====================================
  //===== 驗證登入狀態
  useAuthRedirect();
  //============================================================//
  //=============== useEffect 區
  //===== 解讀登入的會員 ID
  const { user: userPkg } = useContext(AuthContext);
  useEffect(() => {
    if (userPkg === null) {
      console.log("登入時限到了歐");
      setUID(0);
    }

    if (userPkg && Object.prototype.hasOwnProperty.call(userPkg, 'userId')) setUID(userPkg.userId);
  }, [userPkg]);
  //===== 以會員 ID 索取訂單資料，建構訂單初始資料
  useEffect(() => {
    if (!uID || uID === 0) return;

    const CancelToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancelToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/order/${uID}?all=0`, { cancelToken: source.token })
      .then(res => setOrderInfo(res.data.result))
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
      <div className="container py-5">
        <div className="row jc-center">
          <div className="col-12 col-lg-7">
            <table className={s.table}>
              <thead>
                <tr className='bg-shade3 tx-tint5'>
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
                        {orderInfo.ship_thru === "CVS"
                          ? <>
                            <p>收件 7-11 分店：{orderInfo.ship_shop}</p>
                            <p>收件分店地址：{orderInfo.ship_address}</p>
                          </>
                          : <>
                            <p>收件郵遞區號：{orderInfo.ship_zipcode}</p>
                            <p>收件完整地址：{orderInfo.ship_address}</p>
                          </>}
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
              <FddBtn color='shade3' pill={false} outline href='/member/order'>
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
