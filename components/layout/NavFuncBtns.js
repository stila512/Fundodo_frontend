//== Parameters ================================================================
import { apiBaseUrl } from '@/configs';
//== Functions =================================================================
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import FddBtn from '../buttons/fddBtn';
//== Styles =================================================================
import scss from './navFunc.module.scss';
import { IoIosLogIn, IoMdPerson } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';
import { IoIosLogOut } from "react-icons/io";

export default function NavFuncBtns({
  uID = -1,
  setUID = () => { },
  showCart = true
}) {
  const { logout } = useContext(AuthContext);

  //======= handle 購物車數量提示
  const [cartCount, setCartCount] = useState(0);


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

  /** 清除登入狀態相關數值 */
  const handleLogout = () => {
    setUID(-1);
    setCartCount(0);
    logout();
  };

  return (
    <ul className={scss.ulFunc}>
      {/* 站內搜尋 */}
      {/* <li>
        <FddBtn color='white' pill={false} icon callback={() => { }}>
          <AiOutlineSearch />
        </FddBtn>
      </li> */}
      {/* 會員 */}
      <li>
        <FddBtn
          color='white'
          pill={false}
          icon
          title='會員專區'
          href="/member/peopleInfoData"
        >
          <IoMdPerson />
        </FddBtn>
      </li>
      {/* 購物車 */}
      {
        (showCart && uID >= 0) ? (
          <li
            style={{
              paddingRight: uID === 0 ? '' : '.5rem',
              position: 'relative'
            }}
          >
            <FddBtn
              color='white'
              pill={false}
              icon
              title='購物車'
              href="/buy">
              <IoCart />
              <div className={[scss.cartNumber, uID === 0 ? 'd-none' : 'd-flex'].join(' ')}>{cartCount}</div>
            </FddBtn>
          </li>
        ) : (<></>)
      }
      {/* 會員登入 */}
      {
        (uID <= 0) && (
          <li className='d-none d-md-inline-flex'>
            <FddBtn
              color='white'
              pill={false}
              icon
              title='登入'
              href='/member/login'
            >
              <IoIosLogIn />
            </FddBtn>
          </li>
        )
      }
      {/* 會員登出 */}
      {
        (uID > 0) && (
          <li className='d-none d-md-inline-flex'>
            <FddBtn
              color='white'
              pill={false}
              icon
              title='登出'
              callback={() => handleLogout()}
            >
              <IoIosLogOut />
            </FddBtn>
          </li>
        )
      }

    </ul>
  );
}
