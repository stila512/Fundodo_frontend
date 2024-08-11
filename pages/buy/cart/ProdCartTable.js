import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import { NumberPanel } from '@/components/buttons/NumberPanel';
import s from './cart-page.module.scss';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { apiBaseUrl } from '@/configs';

//TODO: 以下 testData 僅供無後台情況時，本機測試用
const testData = [
  {
    name: 'Plus+機能保健系列 泌尿道紓壓保健',
    pic_path: 'PR0000001611.jpg',
    sort_name: '',
    spec_name: '1.5g x 30入',
    price: 450,
    qty: 1,
    key: 'dfjiaoejga'
  },
  {
    name: '花花拾便器套裝',
    pic_path: 'PR0000002581.jpg',
    sort_name: '補充替換袋',
    spec_name: '單入 (拾便器+拾便袋1捲)',
    price: 150,
    qty: 2,
    key: 'ef53j'
  },
  {
    name: 'LINSLINS寵物漏食玩具 - 魔法小兔帽',
    pic_path: 'PR0000003971.jpg',
    sort_name: '魔法小兔帽',
    spec_name: '',
    price: 250,
    qty: 1,
    key: 'ld073f3j'
  },
];

//======= API =====================================
//== parameters
const USER_ID = 58;//todo: test
const apiLink = `${apiBaseUrl}/cart/${USER_ID}`;

//======= API END ==================================

export default function ProdCartTable({ setAmount = () => { }, i_amt = -1 }) {
  const [dataArr, setDataArr] = useState([]);
  const [qtyArr, setQtyArr] = useState([]);
  const [subtotArr, setSubtotArr] = useState([]);
  useEffect(() => {
    //以下寫法參考 Axios 官方文件
    axios.get(apiLink)
      .then(res => {
        setDataArr(res.data.result);
      }).catch(err => {
        console.log("未得到如預期的回應，已啟用備援資料");
        setDataArr(testData);
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
  }, []);
  useEffect(() => {
    setQtyArr(dataArr.flatMap(d => d.qty));
  }, [dataArr]);
  useEffect(() => {
    const subtotList = qtyArr.map((q, i) => q * dataArr[i].price);
    const total = subtotList.reduce((total, cur) => total + cur, 0);
    setSubtotArr(subtotList);
    setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
  }, [qtyArr]);

  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {dataArr.length} 件商品</caption>
        <thead>
          <tr>
            <th style={{ width: '4rem' }}><TbTrashX /></th>
            <th style={{ width: '200px' }}></th>
            <th>商品資訊</th>
            <th>規格</th>
            <th style={{ width: '9rem' }}>單價</th>
            <th>數量</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData ? <tr><th colSpan={7}><h2 className='tx-shade4'>購物車現在空無一物</h2></th></tr> :
            dataArr.map((item, i_data) => (
              <tr key={item.key}>
                <td>
                  <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                    <RxCross2 />
                  </FddBtn>
                </td>
                <td>
                  <div className="img-wrap-h100" style={{ height: 100 }}>
                    <Image
                      src={'/pic-prod/' + item.pic_path}
                      width={0}
                      height={0}
                      alt={item.name}
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  {item.sort_name ? <p>{item.sort_name}</p> : <></>}
                  {item.spec_name ? <p>{item.spec_name}</p> : <></>}
                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.price}
                  </div>
                </td>
                <td><NumberPanel quantity={qtyArr[i_data]} setFunc={setQtyArr} index={i_data} /></td>
                <td>${subtotArr[i_data]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}
