//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useEffect, useState } from 'react'
import axios from 'axios';
import tokenDecoder from '@/context/token-decoder';
import useAuthRedirect from '@/hooks/useAuthRedirect';
//== Components ================================================================
import DefaultLayout from '@/components/layout/default'
import SideText from '@/components/member/SideText';
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

export default function CouponPage() {
  let uID = 0;
  const [cpPkg, setCpPkg] = useState({
    usableArr: [],
    usedArr: [],
    overdueArr: []
  })
  const [activeIndex, setActiveIndex] = useState(0);
  const [data2show, setData2show] = useState([]);

  /** ICON */
  const iconList = [
    <RiSparkling2Line />,
    <MdOutlineDiscount />,
    <MdOutlineAttachMoney />,
    <CiDeliveryTruck />,
    <BsCake2 />,
    <MdOutlineCelebration />,
  ];
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


  //===== 驗證登入狀態
  useAuthRedirect();
  //===== 解讀登入的會員 ID
  useEffect(() => {
    const { userId } = tokenDecoder();
    uID = userId;
  }, [])

  //===== 以會員 ID 索取優惠券資料
  useEffect(() => {
    if (uID === 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/coupon/${uID}`, { cancelToken: source.token })
      .then(res => {
        // 略過將之前被刪除的購物車項目
        //===== 可以避免購物車在回復刪除階段時，將重複品項救回
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
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        console.log("未得到如預期的回應，已啟用備援資料");
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

    return () => {
      //取消 API request
      // 主要在為了在 API 還沒跑完的時間點，使用者就離開頁面的情況
      // 避免 API 無法正常結束
      source.cancel("API 請求已被臨時取消");
    }
  }, [uID])


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
  }, [activeIndex])

  return (
    <div className='bg-tint5'>
      <div className='container'>
        <div className="row">
          <div className="col-12"><span>Home &gt; 會員中心 &gt; 我的優惠券</span></div>
          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <main className='bg-white'>
                  <div className='hstack'>
                    <input type="text" placeholder='請輸入優惠碼' />
                    <div className='bg-primary px-5 py-2'>領取優惠</div>
                  </div>
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
                  <section>
                    <div className={s.countPanel}>
                      <h3 className='tx-shade3' style={{ fontSize: '1.25rem' }}>{data2show.length} 張優惠券</h3>
                    </div>
                    <div className={[s.section].join(' ')}>
                      <div className="row">
                        {data2show.map((data) => (
                          <div key={data.code} className='col-12' style={{ borderBottom: '1px solid #888' }}>
                            <div className="row py-3">
                              <div className="col-3">
                                <div className={s.cpCard}>
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
  )
}

CouponPage.layout = DefaultLayout;