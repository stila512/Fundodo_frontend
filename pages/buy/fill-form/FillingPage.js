//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect } from 'react'
import { useShip711StoreOpener } from '@/hooks/use-ship711';
import useLocalStorage from '@/hooks/use-localstorage'
import axios from 'axios';
//== Components ================================================================
import FddBtn from '@/components/buttons/fddBtn';
import Head from 'next/head';
//== Styles =================================================================
import s from './filling-page.module.scss'
import sw from './ship-way.module.scss'
import { FaAngleLeft, FaCheck } from "react-icons/fa6";
import { TbTriangleFilled } from "react-icons/tb";
import 'animate.css';

export default function FillingPage({
  userID = 0,
  setBuyPhase = () => { },
  setBuyInfoPkg = () => { }
}) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [payCode, setPayCode] = useState('EC');//EC ; LINE
  const [isCVS, setIsCVS] = useState(null);
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
 * @property {string} shop_name
 * @property {string} shop_addr
 * @property {string} ship_ps
 */
  const initOrderDate = {
    addressee: '',/* 收件人 */
    email: '',/* 收件人信箱 */
    phone_num: '',/* 收件人電話 */
    addr_city: 0,/* 收件縣市 */
    addr_code: 0,/* 收件郵遞區號 */
    shop_name: '',/* 收件分店 */
    shop_addr: '',/* 收件分店地址 */
    address: '',/* 收件地址 */
    ship_ps: '',/* 配送備註 */
  };

  /** 全改為 undefined 以避免多餘的自動填入 */
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

  //*==================== 711 分店選擇
  const { store711, openWindow, closeWindow, keyLocalStorage } = useShip711StoreOpener(
    `${apiBaseUrl}/pay/ship711`
  );
  const [_, set711obj] = useLocalStorage(keyLocalStorage, '');

  //===== 初始化：清空 local storage 中的分店資訊
  useEffect(() => {
    set711obj({
      storeid: '',
      storename: '',
      storeaddress: '',
      outside: '',
      ship: '',
      TempVar: ''
    });
  }, []);

  //===== 索取縣市資料
  useEffect(() => {
    if (isCVS) return;

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
  }, [isCVS]);
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
          shop_name,
          shop_addr,
          ship_ps
        } = res.data.result;
        setPrevOrderData({
          addressee: name,
          email,
          phone_num: tel,
          addr_city: city_id,
          addr_code: zipcode,
          address: order_address,
          shop_name,
          shop_addr,
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

  //渲染查得的分店資訊
  useEffect(() => {
    if (store711.storename === '') return;

    const shop_name = store711.storename;
    const shop_addr = store711.storeaddress;

    setOrderData({
      ...orderData,
      shop_name,
      shop_addr,
    });
  }, [store711]);

  //將這次的填寫紀錄存進資料庫
  const saveFormData = () => {
    const {
      addressee,
      email,
      phone_num,
      addr_city,
      addr_code,
      address,
      shop_name,
      shop_addr,
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
      shop_name,
      shop_addr,
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
    // just in case
    if (!prevOrderData) return;

    //先用以觸發「區鄉鎮」的搜尋
    setCityID(prevOrderData.addr_city);
    //觸發畫面上填入
    setAutoOrderData(prevOrderData);
    //觸發 state 的填入
    setOrderData(prevOrderData);
  }

  //*==================== 模式切換
  const handleBeginingBtn = bool => {
    if (isBeginning) setIsBeginning(false);
    setIsCVS(bool);
  }



  //*==================== 步驟切換方法
  const goPrevPhase = () => {
    // todo: need cover more details
    setBuyPhase(1);
  }

  const goNextPhase = () => {
    setBuyInfoPkg(prev => {
      //todo: 防呆

      const cityName = isCVS ? '' : cityList.filter(c => c.id === cityID)[0].name;
      let distName = isCVS ? '' : distList.filter(c => c.zipcode === orderData.addr_code)[0].name;
      const { addressee, email, phone_num, ship_ps, shop_name, shop_addr } = orderData;

      if (distName.charAt(0) === '（') distName = '';

      // 有需要額外處理的才另外給值，其餘則直接給下一階段
      return {
        ...prev,
        orderInfo: {
          ...prev.orderInfo,
          addressee,
          email,
          phone_num,
          shop_name,
          shop_addr,
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

  return (
    <>
      <Head>
        <title>填寫付款資料 | Fundodo</title>
      </Head>
      <main className='container'>
        {/*================= topPanel =================*/}
        <div
          className={[
            'row jc-center py-5',
            s.topPanel, isBeginning ? s.beginningMode : ''
          ].join(' ')}
        >
          {isBeginning &&
            <div className="col-12 col-lg-8 me-auto mb-5">
              <div className="hstack">
                <FddBtn
                  color='white'
                  pill={false}
                  className={s.tempBtn}
                  callback={() => goPrevPhase()}>
                  <FaAngleLeft />回到前一步
                </FddBtn>
              </div>
            </div>
          }
          <h3 className={["col-12 col-lg-8", s.shipwayH3].join(' ')}>
            {isBeginning ? "請選擇配送方式：" : "配送方式："}
          </h3>
          <div className="col-5 d-flex flex-row jc-end">
            <FddBtn color='primary'
              outline={isCVS}
              size='sm'
              className={s.modeBtn}
              callback={() => handleBeginingBtn(false)}
            >
              <>
                <h4>宅配到府</h4>
                <p className='mt-3 tx-default tx-shade3'>填寫寄送資料</p>
              </>
            </FddBtn>
          </div>
          <div className="col-5">
            <FddBtn color='primary'
              outline={!isCVS}
              size='sm'
              className={s.modeBtn}
              callback={() => handleBeginingBtn(true)}
            >
              <h4>超商取貨</h4>
              <p className='mt-3 tx-default tx-shade3'>選擇超商店家</p>
            </FddBtn>
          </div>
        </div>
        {/*================= main area =================*/}
        {isBeginning ||
          <div className="row jc-center">
            <h3 className={["col-12 col-lg-8", s.shipwayH3].join(' ')}>
              訂單資料：
            </h3>
            <div className="col-12">
              {/*========//* 宅配模式  ==================================== */
                isCVS ||
                (
                  <section className="row jc-center">
                    <article className="col-12 col-lg-8">
                      <div className="hstack jc-center">
                        {/*===================== 取用訂購資料 ======================= */}
                        <FddBtn
                          color='primary'
                          outline size='sm'
                          disabled={!prevOrderData}
                          callback={() => autoFill()}
                        >
                          {prevOrderData ? "使用上次訂購的紀錄" : "訂購的紀錄可供"}
                          <br className='d-lg-none' />
                          {prevOrderData ? "一鍵填入" : "下次再次使用"}
                        </FddBtn>
                        {/*===================== 儲存訂購資料 ======================= */}
                        <div className='ms-3 hstack ai-center'>
                          <FddBtn color='primary' size='sm'
                            callback={() => setWannaSave(!wannaSave)}
                            style={{ fontSize: "1rem" }}
                            outline={!wannaSave}
                            icon
                          >
                            <FaCheck />
                          </FddBtn>
                          <span className="ms-2">儲存訂購資料</span>
                        </div>
                      </div>
                    </article>
                    <article className="col-12 col-lg-8 mt-5">
                      <form action="" className={sw.form}>
                        {/*//*===================== 收件人姓名 ======================= */}
                        <div className="row">
                          <div className="col-12 col-lg-4">
                            <label htmlFor="name_receiver" className='tx-default'>收件人姓名 *</label>
                          </div>
                          <div className="col-12 col-lg-8">
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
                          <div className="col-12 col-lg-4">
                            <label htmlFor="email" className='tx-default'>EMAIL *</label>
                          </div>
                          <div className="col-12 col-lg-8">
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
                          <div className="col-12 col-lg-4">
                            <label htmlFor="phone_num" className='tx-default'>收件人行動電話 *</label>
                          </div>
                          <div className="col-12 col-lg-8">
                            <input
                              type='text'
                              name='phone_num'
                              value={autoOrderData ? autoOrderData.phone_num : undefined}
                              onChange={e => handleInput(e)}
                            />
                          </div>
                        </div>
                        {/*//*===================== 收件地址 ======================= */}
                        <div className="row">
                          <div className="col-12 col-lg-4">
                            <label htmlFor="address" className='tx-default'>收件地址 *</label>
                          </div>
                          <div className="col-12 col-lg-8">
                            <div className="row">
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
                          </div>
                        </div>

                        {/*//*===================== 備註 ======================= */}
                        <div className="row">
                          <div className="col-12 col-lg-4">
                            <label htmlFor="ship_ps" className='tx-default'>備註</label>
                          </div>
                          <div className="col-12 col-lg-8">
                            <textarea
                              name='ship_ps'
                              value={autoOrderData ? autoOrderData.ship_ps : undefined}
                              onChange={e => handleInput(e)}
                            />
                          </div>
                        </div>
                      </form>
                    </article>

                  </section>
                )
              }
              {/*========//* 超商模式  ==================================== */
                isCVS &&
                (
                  <>
                    {/* //todo: 7-11 做完再作全家的串接 (https://family.map.com.tw/ShopSpaceQuery/ShopSpaceQuery.asp) */}
                    {/* <div className="col-12">
                      <h2 className='d-inline'>超商選擇：</h2>
                      <FddBtn color='primary' size="sm" href="http://localhost:3005/api/cart/ecpay2">7-11</FddBtn>
                    </div> */}
                    <section className="row jc-center">
                      <article className="col-12 col-lg-10 py-3 py-lg-5">
                        <div className="row jc-center">
                          <div className="col-12 col-lg-auto">
                            <div className="h-100 gr-center">
                              <FddBtn
                                color={store711.storename ? 'shade3' : 'warning'}
                                size='lg'
                                pill={false}
                                className={
                                  [
                                    'animate__animated animate__headShake',
                                    store711.storename ? '' : 'animate__infinite',
                                    sw.selectBtn
                                  ].join(' ')}
                                callback={() => openWindow()}
                              >
                                <p>點我選取</p>
                                <p>小七門市</p>
                              </FddBtn>
                            </div>
                          </div>
                          <div className="col-12 col-lg-2">
                            <div className="h-100 gr-center">
                              <div className={sw.shipwayArrow}>
                                <TbTriangleFilled />
                              </div>
                            </div>
                          </div>
                          <div className="col-11 col-lg-6">
                            <div className={["h-100 gr-center", sw.shopInputBox].join(' ')}>
                              <div>
                                <div>
                                  <label htmlFor="shop_name">門市名稱：</label>
                                </div>
                                <div>
                                  <input type="text" name='shop_name' disabled
                                    value={store711.storename} />
                                </div>
                              </div>
                              <div>
                                <div>
                                  <label htmlFor="shop_addr">門市地址：</label>
                                </div>
                                <div>
                                  <input type="text" name='shop_addr' disabled
                                    value={store711.storeaddress}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article className="col-12 col-lg-10 my-5">
                        <div className="row jc-center">
                          <div className="col-11 col-lg-8">
                            <form action="" className={sw.form}>
                              {/*//*===================== 收件人姓名 ======================= */}
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="name_receiver" className='tx-default'>收件人姓名 *：</label>
                                </div>
                                <div className="col-12 col-lg-8">
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
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="email" className='tx-default'>EMAIL *：</label>
                                </div>
                                <div className="col-12 col-lg-8">
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
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="phone_num" className='tx-default'>收件人行動電話 *：</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <input
                                    type='text'
                                    name='phone_num'
                                    value={autoOrderData ? autoOrderData.phone_num : undefined}
                                    onChange={e => handleInput(e)}
                                  />
                                </div>
                              </div>
                              {/*//*===================== 收件分店 ======================= */}
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="shop_name">門市名稱：</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <input type="text" name='shop_name' disabled
                                    value={store711.storename}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="shop_addr">門市地址：</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <input type="text" name='shop_addr' disabled
                                    value={store711.storeaddress}
                                  />
                                </div>
                              </div>
                              {/*//*===================== 備註 ======================= */}
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <label htmlFor="ship_ps" className='tx-default'>備註：</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <textarea
                                    name='ship_ps'
                                    value={autoOrderData ? autoOrderData.ship_ps : undefined}
                                    onChange={e => handleInput(e)}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </article>
                    </section>
                  </>
                )
              }
              {/* ===================== 切換鈕 ======================= */}
            </div>
            <div className="col-6">
              <div className="hstack jc-evenly py-5">
                <FddBtn
                  color='primary'
                  outline pill={false}
                  size="lg"
                  className={s.moveBtn}
                  callback={() => goPrevPhase()}
                >
                  <FaAngleLeft /><span className='ms-1'>回到購物車</span>
                </FddBtn>
                <FddBtn
                  color='primary'
                  pill={false}
                  size="lg"
                  className={s.moveBtn}
                  callback={() => goNextPhase()}
                >
                  確認送出
                </FddBtn>
              </div>
            </div>
          </div >
        }
      </main >
    </>
  )
}
