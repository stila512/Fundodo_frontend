import { apiBaseUrl } from '@/configs';
import axios from 'axios';

export default async function (cartID) {
  await axios.patch(`${apiBaseUrl}/cart/${cartID}`, {deleted_at: 1})
    .then(res => res)
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