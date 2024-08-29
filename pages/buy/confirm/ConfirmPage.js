//== Parameters =============================================================
import { apiBaseUrl } from '@/configs';
//== Functions ==============================================================
import { useState, useEffect } from 'react';
import tokenDecoder from '@/context/token-decoder';
//== Components =============================================================
import Head from 'next/head';
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import s from './confirm.module.scss';

export default function ConfirmPage({
  setBuyInfoPkg = () => { },
  buyInfoPkg = null
}) {
  if (buyInfoPkg === null) setBuyInfoPkg(2);// just in case

  const { coupons, orderInfo, boughtItems } = buyInfoPkg;
  const today = new Date().toLocaleDateString();

  const [username, setUsername] = useState('會員');

  const shipWayOf = {
    CVS: '超商取貨',
    DLV: '宅配到府'
  };

  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { nickname } = tokenDecoder();

    if (nickname && nickname !== '會員') setUsername(nickname);
    else console.log("是不是登出惹？userId");
  }, []);

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
              <FddBtn color='primary' pill={false} callback={() => { }}>
                前往付款
              </FddBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
