import { useState, useRef, useEffect } from 'react'
import {
  popupCenter,
  addEvent,
  rmEvent,
  pdEvent,
} from '@/utils/popup-window'
import { useRouter } from 'next/router'
import { useInterval } from '@/hooks/use-interval'
import useLocalStorage from '@/hooks/use-localstorage'

/** 7-11 分店資料格式 */
const initShopInfo = {
  storeid: '',
  storename: '',
  storeaddress: '',
  outside: '',
  ship: '',
  TempVar: '',
};

/**
 * 控制彈出視窗 for 7-11 分店查詢
 * @param {string} serverCallbackUrl 接收 7-11 分店查詢回傳結果的伺服器路由網址
 * @param {string} config.title 彈出視窗的標題
 * @param {number} config.h 彈出視窗的高度
 * @param {number} config.w 彈出視窗的寬度
 * @param {number} config.autoCloseMins 在指定分鐘後自動關閉
 * @param {boolean} config.enableLocalStorage 是否 didMount 時要讀取 localStorage 資料
 * @returns 
 */
export function useShip711StoreOpener(
  serverCallbackUrl = '#',
  {
    title = '7-11 運送店家選擇視窗',
    h = 680,
    w = 950,
    autoCloseMins = 5,
    enableLocalStorage = true,
  } = {}
) {
  // 除錯用
  //console.log(serverCallbackUrl, title, h, w, autoCloseMins, enableLocalStorage,keyLocalStorage )

  /** localStorage 的 key */
  const keyLocalStorage = 'store711';

  const [storedValue] = useLocalStorage(keyLocalStorage, initShopInfo);

  // 彈出視窗用
  const newWindow = useRef(null);

  // 記錄店家狀態用
  const [store711, setStore711] = useState(initShopInfo);

  const [startCountDown, setStartCountDown] = useState(false)

  // 預設 5 min 倒數時間，自動關閉
  const [countDown, setContDown] = useState(60 * autoCloseMins)

  // 初始化時清空
  useEffect(() => {
    if (storedValue && storedValue.storeid && enableLocalStorage)
      setStore711(initShopInfo)
  }, []);

  useEffect(() => {
    addEvent('stop-countdown', () => setStartCountDown(false))

    addEvent('set-store', (e) => {
      setStore711(e.detail)
    })

    addEvent('cancel', () => {
      setStartCountDown(false)
      // reset countdown
      setContDown(60 * autoCloseMins)
      console.warn('錯誤:001-因為跳出視窗關閉無法取值')
    })

    return () => {
      rmEvent('set-store')
      rmEvent('stop-countdown')
    }
  }, [])

  // 倒數計時，每秒檢查
  useInterval(
    () => {
      //console.log(countDown)
      // 如果偵測到付款跳出視窗關閉
      if (newWindow.current.closed) {
        setStartCountDown(false)
        // reset countdown
        setContDown(60 * autoCloseMins)

        pdEvent('stop-countdown')
        pdEvent('cancel')

        console.warn('錯誤:002-因為跳出視窗關閉無法取值')
      }

      // 倒數計時結束
      if (countDown === 0) {
        setStartCountDown(false)
        // reset countdown
        setContDown(60 * autoCloseMins)

        pdEvent('cancel')
        console.warn('錯誤:003-因為倒數時間已到無法取值')
        // FIXME: mobile browser(maybe CORS problem)
        newWindow.current.close()
        return
      }

      setContDown(countDown - 1)
    },
    startCountDown ? 1000 : null
  )

  /** 開啟彈出視窗 */
  const openWindow = () => {
    if (!serverCallbackUrl) {
      console.error('錯誤:001-必要。伺服器7-11運送商店用Callback路由網址')
      return
    }

    newWindow.current = popupCenter(
      'https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=1&url=' +
      serverCallbackUrl,
      title,
      w,
      h
    )

    // 啟動計時器
    setStartCountDown(true)
  }

  /** 關閉彈出視窗 */
  const closeWindow = () => {
    newWindow.current.close()
    setStartCountDown(false)
  }

  return {
    store711,
    openWindow,
    closeWindow,
    keyLocalStorage
  }
}

/**
 * 將後台轉址過來的資料存進 local storage
 * @param {string} keyLocalStorage local storage key
 */
export function useShip711StoreCallback(keyLocalStorage = 'store711') {
  const [_, setValue] = useLocalStorage(keyLocalStorage, initShopInfo);

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      // console.log(router.query)

      // 以下為關閉機制
      // focus回原本視窗
      window.opener.focus()

      // 如需要重新整理(母視窗)時，可用以下程式
      //window.opener.location.reload()

      // 通知opener(母視窗)關閉倒數計時
      window.opener.document.dispatchEvent(new CustomEvent('stop-countdown'))

      // 通知opener(母視窗)已完成，回送值
      window.opener.document.dispatchEvent(
        new CustomEvent('set-store', {
          detail: router.query,
        })
      )

      // 設定到localStorage
      setValue(router.query)

      // FIXME: mobile browser can't close self
      // DOMException: Blocked a frame with origin "http://192.168.0.106:3000" from accessing a cross-origin frame.
      // 關閉自己視窗
      window.close()
    }

    // eslint-disable-next-line
  }, [router.isReady])
}