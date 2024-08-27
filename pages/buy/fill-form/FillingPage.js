//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect } from 'react'
import axios from 'axios';
//== Components ================================================================
import FddBtn from '@/components/buttons/fddBtn';
//== Styles =================================================================
import s from './confirm.module.scss'
import { FaAngleLeft } from "react-icons/fa6";

export default function FillingPage({
  setBuyPhase = () => { },
  setBuyInfoPkg = () => { }
}) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isCVS, setIsCVS] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [cityCode, setCityCode] = useState(0);
  const [distList, setDistList] = useState([]);

  const [orderData, setOrderData] = useState({
    addressee: '',/* 收件人 */
    email: '',/* 收件人信箱 */
    phone_num: '',/* 收件人電話 */
    ads_city: '',/* 收件縣市 */
    ads_code: '',/* 收件郵遞區號 */
    address: '',/* 收件地址 */
  });

  const handleInput = e => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  }

  const handleBeginingBtn = bool => {
    if (isBeginning) setIsBeginning(false);
    setIsCVS(bool);
  }

  //===== 索取縣市資料
  useEffect(() => {

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/address/city`, { cancelToken: source.token })
      .then(res => {
        setCityList(res.data.results);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        setCpList([]);
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
  }, []);
  //===== 索取鄉鎮區資料
  useEffect(() => {
    if (cityCode === 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/address/dist/${cityCode}`, { cancelToken: source.token })
      .then(res => {
        setDistList(res.data.results);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        console.log("未得到如預期的回應，已啟用備援資料");
        setCpList([]);
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
  }, [cityCode]);

  const handleCityInput = e => {
    setCityCode(e.target.value);
    handleInput(e);
  }

  const goPrevPhase = () => {
    // todo: need cover more details
    setBuyPhase(1);
  }

  const goNextPhase = () => {
    setBuyInfoPkg();
    setBuyPhase(3);
  }

  //todo 需要與 user 區域串接，儲存訂單資料組

  return (
    <main className='container'>
      <div className={['row jc-center py-5', s.topPanel, isBeginning ? s.beginningMode : ''].join(' ')}>
        <h3 className="col-12">請選擇配送方式：</h3>
        <div className="col-5 d-flex flex-row jc-end">
          <FddBtn color='primary' outline={isCVS} size='sm' className={s.modeBtn} callback={() => handleBeginingBtn(false)}>
            <>
              <h4>宅配到府</h4>
              <p className='mt-3 tx-default tx-shade3'>填寫寄送資料</p>
            </>
          </FddBtn>
        </div>
        <div className="col-5">
          <FddBtn color='primary' outline={!isCVS} size='sm' className={s.modeBtn} callback={() => handleBeginingBtn(true)}>
            <h4>超商取貨</h4>
            <p className='mt-3 tx-default tx-shade3'>選擇超商店家</p>
          </FddBtn>
        </div>
      </div>
      {isBeginning ||
        <div className="row">
          {/*======== 宅配模式  ==================================== */}
          {isCVS ||
            (<>
              <div className="col-12 col-lg-8">
                <form action="" className={s.form}>
                  {/*//*===================== 收件人姓名 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="name_receiver" className='tx-default'>收件人姓名 *</label>
                    </div>
                    <div className="col-12">
                      <input type='text' name='addressee' onChange={e => handleInput(e)} />
                    </div>
                  </div>
                  {/*//*===================== EMAIL ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className='tx-default'>EMAIL *</label>
                    </div>
                    <div className="col-12">
                      <input type='email' name='email' onChange={e => handleInput(e)} />
                    </div>
                  </div>
                  {/*//*===================== 收件人行動電話 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="phone_num" className='tx-default'>收件人行動電話 *</label>
                    </div>
                    <div className="col-12">
                      <input type='text' name='phone_num' onChange={e => handleInput(e)} />
                    </div>
                  </div>
                  {/*//*===================== 收件地址 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="address" className='tx-default'>收件地址 *</label>
                    </div>
                    <div className="col-6">
                      <select name="ads_city" onChange={e => handleCityInput(e)}>
                          <option value={0} selected disabled>- 縣市 -</option>
                        {cityList && cityList.map(city =>
                          <option key={city.id} value={city.id}>{city.name}</option>
                        )}
                      </select>
                    </div>
                    <div className="col-6">
                      <select name="ads_code" onChange={e => handleInput(e)}>
                          <option value={0} selected disabled>- {distList.length > 0 ? "請選擇" : "區鄉鎮"} -</option>
                          {distList.length > 0 && distList.map(district =>
                          <option key={district.zipcode} value={district.zipcode}>{district.name}</option>
                        )}
                      </select>
                    </div>
                    <div className="col-12">
                      <input type="text" name='address' onChange={e => handleInput(e)} />
                    </div>
                  </div>
                  {/*//*===================== 儲存訂購資料 ======================= */}
                  <div>
                    <input type="checkbox" name="saveForNext" />
                    <label htmlFor="saveForNext">儲存訂購資料</label>
                  </div>
                  {/*//*===================== 備註 ======================= */}
                  <div>
                    <label htmlFor="ps" className='tx-default'>備註</label>
                  </div>
                  <div>
                    <textarea />
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-8">
                <div className="hstack jc-between">
                  <FddBtn color='white' pill={false} callback={() => goPrevPhase()}>
                    <FaAngleLeft />回到購物車
                  </FddBtn>
                  <FddBtn color='primary' pill={false} size="lg" callback={() => { }}>確認送出</FddBtn>
                </div>
              </div>
            </>)
          }
          {/*======== 超商模式  ==================================== */}
          {
            isCVS &&
            <div className="col-12">
              <h2 className='d-inline'>超商選擇：</h2>
              <FddBtn color='primary' size="sm" href="http://localhost:3005/api/cart/ecpay2">7-11</FddBtn>
            </div>
          }
        </div >}
    </main >
  )
}
