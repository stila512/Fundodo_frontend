//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect } from 'react'
import axios from 'axios';
//== Components ================================================================
import FddBtn from '@/components/buttons/fddBtn';
import Head from 'next/head';
//== Styles =================================================================
import s from './filling-page.module.scss'
import { FaAngleLeft } from "react-icons/fa6";

export default function FillingPage({
  userID = 0,
  setBuyPhase = () => { },
  setBuyInfoPkg = () => { }
}) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [payCode, setPayCode] = useState('EC');//EC ; LINE
  const [isCVS, setIsCVS] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [cityID, setCityID] = useState(0);
  const [distList, setDistList] = useState([]);
  const [wannaSave, setWannaSave] = useState(true);

  /**
 * 購物的訂單資料
 * @typedef {object} myobj
 * @property {string} addressee
 * @property {string} email
 * @property {string} phone_num
 * @property {number} addr_city
 * @property {number} addr_code
 * @property {string} address
 * @property {string} ship_ps
 */
  const initOrderDate = {
    addressee: '',/* 收件人 */
    email: '',/* 收件人信箱 */
    phone_num: '',/* 收件人電話 */
    addr_city: 0,/* 收件縣市 */
    addr_code: 0,/* 收件郵遞區號 */
    address: '',/* 收件地址 */
    ship_ps: '',/* 配送備註 */
  };
  const bufferOrderDate = {
    addressee: undefined,
    email: undefined,
    phone_num: undefined,
    addr_city: undefined,
    addr_code: undefined,
    address: undefined,
    ship_ps: undefined,
  };
  // 儲存本次購物的訂單資料
  const [orderData, setOrderData] = useState(initOrderDate);

  //儲存上次購物的訂單資料
  /** @type {[myobj, React.Dispatch<myobj>]} */
  const [prevOrderData, setPrevOrderData] = useState(null);

  //暫存上次購物的訂單資料
  /** @type {[myobj, React.Dispatch<myobj>]} */
  const [autoOrderData, setAutoOrderData] = useState(null);

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
    if (cityID === 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/address/dist/${cityID}`, { cancelToken: source.token })
      .then(res => {
        setDistList(res.data.results);
      })
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

    return () => {
      //取消 API request
      // 主要在為了在 API 還沒跑完的時間點，使用者就離開頁面的情況
      // 避免 API 無法正常結束
      source.cancel("API 請求已被臨時取消");
    }
  }, [cityID, autoOrderData]);

  //在一開始查詢上一次的填寫紀錄
  useEffect(() => {
    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件，res 已自動轉成 json 格式
    axios.get(
      `${apiBaseUrl}/member/order-form/${userID}`,
      { cancelToken: source.token }
    ).then(res => {
      if (res.data.result) {
        const {
          name,
          email,
          tel,
          city_id,
          zipcode,
          order_address,
          ship_ps
        } = res.data.result;
        setPrevOrderData({
          addressee: name,
          email,
          phone_num: tel,
          addr_city: city_id,
          addr_code: zipcode,
          address: order_address,
          ship_ps,
        });
      }
    }).catch(err => {
      //請求尚未完成就離開頁面或重整
      if (axios.isCancel(err))
        return console.log('查詢上次填寫紀錄之請求已成功取消');

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

  //更新這次的填寫紀錄
  const saveFormData = () => {
    const {
      addressee,
      email,
      phone_num,
      addr_city,
      addr_code,
      address,
      ship_ps
    } = orderData;
    const data = {
      user_id: userID,
      name: addressee,
      email,
      tel: phone_num,
      city_id: addr_city,
      zipcode: addr_code,
      order_address: address,
      ship_ps
    }
    axios.post(`${apiBaseUrl}/member/order-form`, data)
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

  const handleInput = e => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
    setAutoOrderData(bufferOrderDate);
  }

  const handleBeginingBtn = bool => {
    if (isBeginning) setIsBeginning(false);
    setIsCVS(bool);
  }

  const handleCityInput = e => {
    //需要特地轉 number 是因為 input 元素回傳都會變成字串
    setCityID(Number(e.target.value));
    handleInput(e);
  }
  const handleZipInput = e => {
    //需要特地轉 number 是因為 input 元素回傳都會變成字串
    setOrderData({
      ...orderData,
      [e.target.name]: Number(e.target.value)
    });
  }

  const autoFill = () => {
    if (!prevOrderData) return;
    //先用以觸發「區鄉鎮」的搜尋
    setCityID(prevOrderData.addr_city);
    //觸發畫面上填入
    setAutoOrderData(prevOrderData);
    //觸發 state 的填入
    setOrderData(prevOrderData);
  }

  const goPrevPhase = () => {
    // todo: need cover more details
    setBuyPhase(1);
  }

  const goNextPhase = () => {
    setBuyInfoPkg(prev => {
      //todo: 防呆
      const cityName = cityList.filter(c => c.id === cityID)[0].name;
      let distName = distList.filter(c => c.zipcode === orderData.addr_code)[0].name;
      const { addressee, email, phone_num, ship_ps } = orderData;

      if (distName.charAt(0) === '（') distName = '';

      return {
        ...prev,
        orderInfo: {
          ...prev.orderInfo,
          addressee,
          email,
          phone_num,
          pay_thru: payCode,
          ship_thru: isCVS ? "CVS" : "DLV",
          ship_zipcode: orderData.addr_code,
          ship_address: cityName + distName + orderData.address,
          ship_ps
        }
      }
    });
    if (wannaSave) saveFormData();

    (() => {
      if (typeof window === 'undefined') return;
      window.scrollTo(0, 0);
    })();
    setBuyPhase(3);
  }

  //todo 需要與 user 區域串接，儲存訂單資料組

  return (
    <>
      <Head>
        <title>填寫付款資料 | Fundodo</title>
      </Head>
      <main className='container'>
        <div className={['row jc-center py-5', s.topPanel, isBeginning ? s.beginningMode : ''].join(' ')}>
          {isBeginning &&
            <div className="col-12 col-lg-8 me-auto mb-5">
              <div className="hstack">
                <FddBtn
                  color='white'
                  pill={false}
                  className={s.tempBtn}
                  callback={() => goPrevPhase()}>
                  <FaAngleLeft />回到購物車
                </FddBtn>
              </div>
            </div>}
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
          <div className="row jc-center">
            {/*======== 宅配模式  ==================================== */}
            {isCVS ||
              (<>
                <div className="col-12 col-lg-8">
                  <div className="hstack">
                    {/*===================== 取用訂購資料 ======================= */}
                    <FddBtn
                      color='primary'
                      outline size='sm'
                      callback={() => autoFill()}
                    >
                      {prevOrderData ? "使用上次訂購的紀錄" : "訂購的紀錄得下次再次使用"}
                    </FddBtn>
                    {/*===================== 儲存訂購資料 ======================= */}
                    <div>
                      <input type="checkbox" name="saveForNext"
                        checked={wannaSave}
                        onChange={() => setWannaSave(!wannaSave)}
                      />
                      <label htmlFor="saveForNext">儲存訂購資料</label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8">
                  <form action="" className={s.form}>
                    {/*//*===================== 收件人姓名 ======================= */}
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="name_receiver" className='tx-default'>收件人姓名 *</label>
                      </div>
                      <div className="col-12">
                        <input
                          type='text'
                          name='addressee'
                          value={autoOrderData ? autoOrderData.addressee : undefined}
                          onChange={e => handleInput(e)}
                          required
                        />
                      </div>
                    </div>
                    {/*//*===================== EMAIL ======================= */}
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="email" className='tx-default'>EMAIL *</label>
                      </div>
                      <div className="col-12">
                        <input
                          type='email'
                          name='email'
                          value={autoOrderData ? autoOrderData.email : undefined}
                          onChange={e => handleInput(e)}
                        />
                      </div>
                    </div>
                    {/*//*===================== 收件人行動電話 ======================= */}
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="phone_num" className='tx-default'>收件人行動電話 *</label>
                      </div>
                      <div className="col-12">
                        <input
                          type='text'
                          name='phone_num'
                          value={autoOrderData ? autoOrderData.phone_num : undefined}
                          onChange={e => handleInput(e)} />
                      </div>
                    </div>
                    {/*//*===================== 收件地址 ======================= */}
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="address" className='tx-default'>收件地址 *</label>
                      </div>
                      <div className="col-6">
                        <select
                          name="addr_city"
                          value={autoOrderData ? autoOrderData.addr_city : undefined}
                          defaultValue={0}
                          onChange={e => handleCityInput(e)}
                        >
                          <option value={0} disabled >- 縣市 -</option>
                          {cityList && cityList.map(city =>
                            <option key={city.id} value={city.id}>{city.name}</option>
                          )}
                        </select>
                      </div>
                      <div className="col-6">
                        <select name="addr_code"
                          value={autoOrderData ? autoOrderData.addr_code : 0}
                          defaultValue={0}
                          onChange={e => handleZipInput(e)}
                        >
                          <option value={0} disabled>
                            - {distList.length > 0 ? "請選擇" : "區鄉鎮"} -
                          </option>
                          {distList.length > 0 && distList.map(district =>
                            <option key={district.zipcode} value={district.zipcode}>{district.name}</option>
                          )}
                        </select>
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          name='address'
                          value={autoOrderData ? autoOrderData.address : undefined}
                          onChange={e => handleInput(e)}
                        />
                      </div>
                    </div>

                    {/*//*===================== 備註 ======================= */}
                    <div>
                      <label htmlFor="ship_ps" className='tx-default'>備註</label>
                    </div>
                    <div>
                      <textarea
                        name='ship_ps'
                        value={autoOrderData ? autoOrderData.ship_ps : undefined}
                        onChange={e => handleInput(e)}
                      />
                    </div>
                  </form>
                </div>
                {/* ===================== 切換鈕 ======================= */}
                <div className="col-12 col-lg-8">
                  <div className="hstack jc-between">
                    <FddBtn color='white' pill={false} callback={() => goPrevPhase()}>
                      <FaAngleLeft />回到購物車
                    </FddBtn>
                    <FddBtn
                      color='primary'
                      pill={false}
                      size="lg"
                      callback={() => goNextPhase()}
                    >
                      確認送出
                    </FddBtn>
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
    </>
  )
}
