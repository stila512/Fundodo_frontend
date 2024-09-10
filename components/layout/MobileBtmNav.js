//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { AuthContext } from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FddBtn from '../buttons/fddBtn'
//== Styles =================================================================
import s from './mb-btm-nav.module.scss';
import { FaHouse } from "react-icons/fa6";
import { FaHeart } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { IoCart } from 'react-icons/io5';

export default function MobileBtmNav() {
  const { user } = useContext(AuthContext);
  //======= handle 購物車數量提示
  const [cartCount, setCartCount] = useState(0);
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
    // 其他情況的提防
    if (typeof user !== 'object') return console.error('objcet "user" 出現了意料外的情形!!');

    setUID(user.userId);
  }, [user]);
  //===== 以會員 ID 索取購物車資料
  useEffect(() => {
    if (uID <= 0) return;

    const CancalToken = axios.CancelToken;//中止情況用的信號彈
    const source = CancalToken.source();

    //以下寫法參考 Axios 官方文件
    axios.get(`${apiBaseUrl}/cart/${uID}`, { cancelToken: source.token })
      .then(res => {
        // 略過將之前被刪除的購物車項目
        //===== 可以避免購物車在回復刪除階段時，將重複品項救回
        const dataPkg = Object.entries(res.data.result)
        const count = dataPkg.reduce(
          (sum, cur) => sum + (cur[1] ? cur[1].filter(item => !item.deleted_at).length : 0),
          0
        );

        setCartCount(count);
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('此請求已成功取消');
          return;
        }

        console.log("未得到如預期的回應，已啟用備援資料");
        setCartCount(0);
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
  }, [uID]);

  return (
    <div className={s.btmNav}>
      <FddBtn color='white' pill={false}
        icon size='lg' href="/home"><FaHouse /></FddBtn>
      <FddBtn color='white' pill={false}
        icon size='lg' href="/member/peopleInfoData"><IoMdPerson /></FddBtn>
      <FddBtn color='white' pill={false}
        icon size='lg' href="/prod/list/favoriteProd"><FaHeart /></FddBtn>
      <FddBtn color='white' pill={false}
        icon size='lg' href="/buy" style={{ position: 'relative' }}>
        <IoCart />
        <div className={[s.cartNumber, uID === 0 ? 'd-none' : 'd-flex'].join(' ')}>{cartCount}</div>
      </FddBtn>
    </div >
  )
}
