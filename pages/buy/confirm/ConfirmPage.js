//== Parameters =============================================================
import { apiBaseUrl } from '@/configs';
//== Functions ==============================================================
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import tokenDecoder from '@/context/token-decoder';
import axios from 'axios';
//== Components =============================================================
import Head from 'next/head';
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import s from './confirm.module.scss';

export default function ConfirmPage({
  setBuyPhase = () => { },
  buyInfoPkg = null,
}) {
  if (buyInfoPkg === null) setBuyPhase(2);// just in case

  const { coupons, orderInfo, boughtItems } = buyInfoPkg;
  const today = new Date().toLocaleDateString();

  const [username, setUsername] = useState('會員');
  const [ECPAY_PKG, setECPAY_PKG] = useState(null);

  const shipWayOf = {
    CVS: '超商取貨',
    DLV: '宅配到府'
  };

  // const submitRef = useRef(null);

  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { nickname } = tokenDecoder();

    if (nickname && nickname !== '會員') setUsername(nickname);
    else console.log("是不是登出惹？userId");
  }, []);

  /**偵測使用的優惠券，若是特定的 cp_id，則給予新的優惠券*/
  const triggerNewCoupon = () => {
    const dataPkg = {
      user_id: orderInfo.user_id,
      ucids: coupons
    };
    axios.post(`${apiBaseUrl}/coupon/checkout`, dataPkg)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
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
  }
  /** 建立訂單進資料庫: orders */
  const insertOrder = async () => {
    const { addressee, email, phone_num, ps, ...pkg } = orderInfo;

    return axios.post(`${apiBaseUrl}/order`, pkg)
      .then(res => {
        console.log(res.data.message);
        return res.data.order_id;
      })
      .catch(err => {
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
  }

  /** 刪除 cart 資料表中的資料 */
  const emptyCart = async () => {
    const dataPkg = {
      user_id: orderInfo.user_id,
      cart_ids: boughtItems.map(item => item.cart_id)
    };

    //! delete 規格與 post 不同，匯入資料的方式如下
    axios.delete(`${apiBaseUrl}/cart`, { data: dataPkg })
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
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
      });;
  }

  /** 建立訂單進資料庫: order_items */
  const insertOrderItem = async oid => {
    const purchaseItems = boughtItems.map(item => {
      const { cart_id, ...others } = item;
      return others;
    })

    const dataPkg = {
      order_id: oid,
      purchaseItems
    };

    axios.post(`${apiBaseUrl}/order/items`, dataPkg)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
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
  }

  const updateCoupons = async () => {
    const dataPkg = {
      user_id: orderInfo.user_id,
      ucids: coupons
    };

    await axios.patch(`${apiBaseUrl}/coupon`, dataPkg)
      .then(res => {
        console.log(res.data.message);
      }).catch(err => {
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
  };

  const handleForECPAY = async () => {
    await axios.post(`${apiBaseUrl}/cart/ecpay`, { amt: orderInfo.amount })
      .then(response => {
        const { apiURL, inputArr } = response.data.package;
        setECPAY_PKG({
          apiURL,
          inputArr
        });
      }).catch(err => {
        console.log('失敗惹QwQ: ' + err.message);
      });

  }

  const router = useRouter();

  const checkout = async () => {
    triggerNewCoupon();
    const orderID = await insertOrder();
    await insertOrderItem(orderID);
    await emptyCart();
    await updateCoupons();

    router.push(`${apiBaseUrl}/cart/ecpay`)
    // await handleForECPAY();
  }

  return (
    <>
      <Head>
        <title>確認付款 | Fundodo</title>
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
                  <td className='p-3'>
                    <p>親愛的 {username}</p>
                    <p>為確保您的權益，請您再次確認以下的訂單資訊是否正確。</p>
                    <p>訂單總金額： {orderInfo.amount} 元</p>
                    <p>訂購日期： {today}</p>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-7">
            <table className={s.table}>
              <thead>
                <tr className='bg-tint5'>
                  <th className='py-3'>付款與寄送資訊</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <div className="d-flex flex-c flex-lg-r w-100">
                    <div className='p-3 flex-grow-1'>
                      <p>付款方式：線上付款</p>
                      <p>配送方式：{shipWayOf[orderInfo.ship_thru]}</p>
                    </div>
                    <div className='p-3 flex-grow-1'>
                      <p>收件人：{orderInfo.addressee}</p>
                      <p>聯絡電話：{orderInfo.phone_num}</p>
                      <p>電子信箱：{orderInfo.email}</p>
                      <p>收件郵遞區號：{orderInfo.ship_zipcode}</p>
                      <p>收件完整地址：{orderInfo.ship_address}</p>
                      <p>收件備註：{orderInfo.ps}</p>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-7">
            <div className="hstack jc-center gap-5">
              <FddBtn color='primary' pill={false} outline callback={() => setBuyPhase(2)}>
                編輯資料
              </FddBtn>
              <FddBtn color='primary' pill={false} callback={() => checkout()}>
                前往付款
              </FddBtn>
            </div>
          </div>
        </div>
      </div>
      {/* <form action={ECPAY_PKG ? ECPAY_PKG.apiURL : ''} className="d-none">
        {ECPAY_PKG ? ECPAY_PKG.inputArr.join('') : <></>}
      </form>
      <button type="submit" value="送出參數" ref={submitRef} /> */}
    </>
  )
}
