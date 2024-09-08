import { apiBaseUrl } from '@/configs';
import axios from 'axios';

/**
 * 對指定購物車項目進行軟刪除
 * @param {number} cartID 購物車品項的 id
 * @returns {{
 * isOK: boolean,
 * message: string
 * }} 回覆的物件中，isOK 代表刪除是否成功，message 則為回傳訊息
 */
export default async function (cartID) {
  let isOK = true;
  const message = await axios.patch(`${apiBaseUrl}/cart/${cartID}`, { deleted_at: 1 })
    .then(res => res.data.message)
    .catch(err => {
      isOK = false;

      if (err.response) {
        //status != 2XX
        console.error(err.response.data.message);
      } else if (err.request) {
        // 伺服器沒有回應
        console.log("伺服器沒有回應");
      } else {
        console.log("未知的錯誤情形");
        console.log(err);
      }
      return '刪除失敗，請通知網站管理人員';
    });

  return { isOK, message }
}