//== Parameters =============================================================
import { apiBaseUrl } from '@/configs';
//== Functions ==============================================================
import { useState, useEffect } from 'react';
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
  /** 處理狀態 */
  const [isLoading, setIsLoading] = useState(false);

  const shipWayOf = {
    CVS: '超商取貨',
    DLV: '宅配到府'
  };

  useEffect(() => {
    //===== 解讀登入的會員 ID
    const { nickname } = tokenDecoder();

    if (nickname && nickname !== '會員') setUsername(nickname);
    else console.log("是不是登出惹？userId");

    //===== 解讀登入的會員 ID
    axios.post(`${apiBaseUrl}/cart/ecpay`, { amount: orderInfo.amount })
      .then(response => {
        const { apiURL, inputArr } = response.data.package;
        setECPAY_PKG({
          apiURL,
          inputArr
        });
      }).catch(err => {
        console.log('失敗惹QwQ: ' + err.message);
      });
  }, []);

  /**偵測使用的優惠券，若是特定的 cp_id，則給予新的優惠券*/
  const triggerNewCoupon = async () => {
    if (coupons.length === 0) return;

    const dataPkg = {
      user_id: orderInfo.user_id,
      ucids: coupons
    };
    await axios.post(`${apiBaseUrl}/coupon/checkout`, dataPkg)
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
    const data = orderInfo.ship_thru === 'DLV'
      ? {
        ...orderInfo,
        tel: orderInfo.phone_num,
        ship_ps: orderInfo.ship_ps || '（無）'
      } : {
        ...orderInfo,
        tel: orderInfo.phone_num,
        ship_ps: orderInfo.ship_ps || '（無）',
        ship_shop: orderInfo.shop_name,
        ship_address: orderInfo.shop_addr
      };

    return await axios.post(`${apiBaseUrl}/order`, data)
      .then(res => {
        console.log(res.data.message);
        return res.data.result.order_id;
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
    if (coupons.length === 0) return;

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

  const checkout = async () => {
    setIsLoading(true);
    await triggerNewCoupon();
    const orderID = await insertOrder();
    await insertOrderItem(orderID);
    await emptyCart();
    await updateCoupons();
    document.getElementById('ECPAY-form').submit();
  }

  return (
    <>
      <Head>
        <title>確認付款 | Fundodo</title>
      </Head>
      <div className="container pt-5">
        <div className="row jc-center">
          <div className="col-8 col-lg-12">
            <div className={["row jc-center", s.row].join(' ')}>
              <div className="col-12 col-lg-7">
                <div className={['row', s.tableRow].join(' ')}>
                  <div className='col-12 bg-tint5'>
                    <h4 className='py-3 tx-center'>付款與寄送資訊</h4>
                  </div>
                </div>
                <div className={['row', s.tableRow, , s.tableRow2].join(' ')}>
                  <div className='col-12 py-3 px-5'>
                    <p>親愛的 {username}</p>
                    <p>為確保您的權益，請您再次確認<br className='d-lg-none' />以下的訂單資訊是否正確。</p>
                    <p>訂單總金額： {orderInfo.amount.toLocaleString()} 元</p>
                    <p>訂購日期： {today}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7">
                <div className={['row', s.tableRow].join(' ')}>
                  <div className='col-12 bg-tint5'>
                    <h4 className='py-3 tx-center'>付款與寄送資訊</h4>
                  </div>
                </div>
                <div className={['row', s.tableRow, , s.tableRow2].join(' ')}>
                  <div className='col-12 col-lg-4 py-3 px-5'>
                    <p>付款方式：線上付款</p>
                    <p>配送方式：{shipWayOf[orderInfo.ship_thru]}</p>
                  </div>
                  <div className='col-12 col-lg-8 py-3 px-5'>
                    <p>收件人：{orderInfo.addressee}</p>
                    <p>聯絡電話：{orderInfo.phone_num}</p>
                    <p>電子信箱：{orderInfo.email}</p>
                    {orderInfo.ship_thru === "CVS"
                      ? <>
                        <p>收件 7-11 分店：{orderInfo.shop_name}</p>
                        <p>收件分店地址：{orderInfo.shop_addr}</p>
                      </>
                      : <>
                        <p>收件郵遞區號：{orderInfo.ship_zipcode}</p>
                        <p>收件完整地址：{orderInfo.ship_address}</p>
                      </>}
                    <p>收件備註：{orderInfo.ship_ps || '（無）'}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7">
                <div className="hstack jc-center gap-5">
                  <FddBtn
                    color='primary' pill={false}
                    style={{ paddingInline: 0, width: '100%' }}
                    outline callback={() => setBuyPhase(2)}>
                    編輯資料
                  </FddBtn>
                  <FddBtn
                    color={ECPAY_PKG ? 'primary' : 'muted'} pill={false}
                    style={{ paddingInline: 0, width: '100%' }}
                    disabled={!ECPAY_PKG} callback={() => checkout()}>
                    {ECPAY_PKG ? (isLoading ? "送出中..." : "前往付款") : "請稍後"}
                  </FddBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        method='post'
        action={ECPAY_PKG ? ECPAY_PKG.apiURL : ''}
        id='ECPAY-form'
        className="d-none"
      >
        {ECPAY_PKG &&
          ECPAY_PKG.inputArr.map((param, i) => (<input key={i} name={param[0]} value={param[1].toString()} />))
        }
      </form>
    </>
  )
}
