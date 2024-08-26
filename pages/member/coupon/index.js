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

export default function CouponPage() {
  let uID = 0;
  const [cpPkg, setCpPkg] = useState({
    usableArr: [],
    usedArr: [],
    overdueArr: []
  })
  const [activeIndex, setActiveIndex] = useState(0);
  const [data2show, setData2show] = useState([]);


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
                          <div className='col-12' style={{ border: '1px solid #888' }}>
                            <p>code: {data.code}</p>
                            <p>expired_at: {data.expired_at}</p>
                            <p>name: {data.name}</p>
                            <p>desc: {data.desc}</p>
                            <p>desc_sp: {data.desc_sp}</p>
                            <p>discount: {data.discount}</p>
                            <p>min_spent: {data.min_spent}</p>
                            <p>max_discount: {data.max_discount}</p>
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