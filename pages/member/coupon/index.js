//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components ================================================================
import DefaultLayout from '@/components/layout/default'
import SideText from '@/components/member/SideText';
import Head from 'next/head';
//== Styles =================================================================
import s from './coupon.module.scss';
import { BsCake2 } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  MdOutlineCelebration,
  MdOutlineAttachMoney,
  MdOutlineDiscount
} from "react-icons/md";
import { RiSparkling2Line } from "react-icons/ri";
import FddBtn from '@/components/buttons/fddBtn';
import useTimeout from '@/hooks/use-setTimeout';

export default function CouponPage() {
  //*============================ 初始渲染
  //===== 驗證登入狀態
  useAuthRedirect();

  const { user } = useContext(AuthContext);

  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);

  //===== 獲得登入的會員 ID
  useEffect(() => {
    //第一次載入，得到 undefined
    if (user === undefined) return;
    //第二次載入，得到 null
    if (user === null) return setUID(0);

    setUID(user.userId);
  }, [user]);

  const [cpPkg, setCpPkg] = useState({
    usableArr: [],
    usedArr: [],
    overdueArr: []
  });


  //===== 以會員 ID 索取優惠券資料

  const readCpData = (tokenSrc = null) => {
    //以下寫法參考 Axios 官方文件
    axios.get(
      `${apiBaseUrl}/coupon/${uID}`,
      tokenSrc ? { cancelToken: tokenSrc.token } : {}
    ).then(res => {
      const dataPkg = res.data.result;
      const usableArr = dataPkg.usableArr;
      const usedArr = dataPkg.usedArr;
      const overdueArr = dataPkg.overdueArr;
      setCpPkg(
        {
          usableArr,
          usedArr,
          overdueArr
        }
      );
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log('索取會員優惠券資料之請求已成功取消');
        return;
      }

      setCpPkg({
        usableArr: [],
        usedArr: [],
        overdueArr: []
      });
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

  useEffect(() => {
    if (uID <= 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    readCpData(source);

    return () => {
      //取消 API request
      // 主要在為了在 API 還沒跑完的時間點，使用者就離開頁面的情況
      // 避免 API 無法正常結束
      source.cancel("API 請求已被臨時取消");
    }
  }, [uID]);

  const [data2show, setData2show] = useState([]);

  useEffect(() => {
    setData2show(cpPkg.usableArr);
  }, [cpPkg]);

  //*============================顯示切換
  /** ICON */
  const iconList = [
    <RiSparkling2Line />,
    <MdOutlineDiscount />,
    <MdOutlineAttachMoney />,
    <CiDeliveryTruck />,
    <BsCake2 />,
    <MdOutlineCelebration />,
  ];

  /**
   * 根據優惠券種類決定圖案
   * @param {number} cp_id 優惠券系統之 id
   * @returns {React.Component} React.icons 元件
   */
  const getIcon = cp_id => {
    switch (cp_id) {
      case 4:
      case 10:
        return iconList[0];
      case 5:
      case 6:
      case 11:
      case 12:
      case 13:
      case 14:
        return iconList[1];
      case 1:
      case 2:
      case 15:
      case 16:
        return iconList[2];
      case 3:
      case 9:
        return iconList[3];
      case 7:
        return iconList[4];
      case 8:
      case 17:
      case 18:
      case 19:
        return iconList[5];
      default: return iconList[1];
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);

  //===== 切換顯示資料
  useEffect(() => {
    switch (activeIndex) {
      case 0:
        setData2show(cpPkg.usableArr);
        break;
      case 1:
        setData2show(cpPkg.usedArr);
        break;
      case 2:
        setData2show(cpPkg.overdueArr);
        break;
      default:
        setData2show(cpPkg.usableArr);
        break;  // 預設顯示可使用的優惠券
    }
  }, [activeIndex]);

  const cardClass = activeIndex === 0 ? '' : 'card' + activeIndex;


  //*============================ 領取優惠券

  const [claimCode, setClaimcode] = useState('');
  const [claimMsg, setClaimMsg] = useState('');

  // const handleClaimMsg = message => {
  //   setClaimMsg(message);
  //   useTimeout(() => setClaimMsg(''), 5000);
  // };

  const handleClaim = () => {
    if (claimCode.length === 0)
      return setClaimMsg('請輸入領取碼');

    if (isNaN(uID) || uID <= 0)
      return console.error('登入狀態異常，請重新登入');

    if (
      [
        claimCode.length > 10,
        claimCode.length < 8,
        !claimCode.startsWith('fdd')
      ].some(v => v))
      return setClaimMsg('查無此張優惠券');

    const pkg = {
      user_id: uID,
      cp_code: claimCode
    }
    axios.post(`${apiBaseUrl}/coupon/claim`, pkg)
      .then(res => {
        if (res.data.result === true) readCpData();
        setClaimMsg(res.data.message);
      })
      .catch(err => {
        if (err.response) {
          //status != 2XX
          setClaimMsg(err.response.data.message);
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


  return (
    <>
      <Head><title>我的優惠券 | Fundodo</title></Head>
      <div className='bg-tint5' onClick={() => setClaimMsg('')}>
        <div className='container'>
          <div className="row">
            <div className="col-12"><span>Home &gt; 會員中心 &gt; 我的優惠券</span></div>
            <div className="col-12">
              <div className="row">
                <div className="col-10">
                  <main className='bg-white'>
                    {/* 領取區域 */}
                    <div className='hstack p-3'>
                      <input
                        type="text"
                        className={s.claimInput}
                        placeholder='請輸入優惠碼'
                        onChange={e => setClaimcode(e.target.value)}
                      />
                      <FddBtn color='primary' pill={false} callback={() => handleClaim()}>領取優惠</FddBtn>
                      <p className='ps-3 tx-error'>{claimMsg}</p>
                    </div>
                    {/* 分頁按鈕 */}
                    <div className={s.tabBox}>
                      <button
                        className={['', activeIndex === 0 ? s.active : ''].join(' ')}
                        onClick={() => setActiveIndex(0)}
                      >
                        可使用的優惠券 ({cpPkg.usableArr.length})
                      </button>
                      <button
                        className={['', activeIndex === 1 ? s.active : ''].join(' ')}
                        onClick={() => setActiveIndex(1)}
                      >
                        已使用的優惠券 ({cpPkg.usedArr.length})
                      </button>
                      <button
                        className={['', activeIndex === 2 ? s.active : ''].join(' ')}
                        onClick={() => setActiveIndex(2)}
                      >
                        已失效的優惠券 ({cpPkg.overdueArr.length})
                      </button>
                    </div>
                    {/* 優惠券列表 */}
                    <section>
                      <div className={s.countPanel}>
                        <h3 className='tx-shade3'>
                          {data2show.length} 張優惠券
                        </h3>
                      </div>
                      <div className={[s.section].join(' ')}>
                        <div className="row">
                          {data2show.map((data) => (
                            <div key={data.code} className='col-12' style={{ borderBottom: '1px solid #888' }}>
                              <div className={["row py-3", activeIndex === 0 ? s.cpRow : ''].join(' ')}>
                                <div className="col-3">
                                  <div className={[s.cpCard, s[cardClass]].join(' ')}>
                                    {getIcon(data.cp_id)}
                                  </div>
                                </div>
                                <div className="col-9">
                                  <p className='tx-lg'>{data.name}</p>
                                  <p>適用情形: {data.desc}</p>
                                  <p>有效期限: {data.expired_at} 以前</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </main>
                </div>
                <div className="col-2">
                  <SideText activeIndex={5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CouponPage.layout = DefaultLayout;