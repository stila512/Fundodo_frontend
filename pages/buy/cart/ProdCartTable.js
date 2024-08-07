import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import { NumberPanel } from './NumberPanel';
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

//======= API ==================================
//== parameters
const USER_ID = 58;//todo: test
const apiLink = `${apiBaseUrl}/carts/${USER_ID}`;

//======= API END ==================================

export default function ProdCartTable() {
  const [dataArr, setDataArr] = useState([]);
  const [qtyArr, setQtyArr] = useState([]);
  const [totArr, setTotArr] = useState([]);
  useEffect(() => {
    // 只在這裡使用的函數，以立即函數的方式撰寫
    (async () => {
      const results = await axios.get(apiLink);

      if (results.data.status !== 'success') {
        throw new Error(`伺服器回應：${response.data.message}`);
      }
      setDataArr(results.data.result);
    })();
    //TODO: 以下兩行僅供無後台情況時，本機測試用
    //   setDataArr(testData);
    //   setQtyArr(testData.flatMap(d => d.qty));
  }, []);
  useEffect(() => {
    setQtyArr(dataArr.flatMap(d => d.qty));
  }, [dataArr]);
  useEffect(() => {
    const totList = qtyArr.map((q, i) => q * dataArr[i].price);
    setTotArr(totList);
  }, [qtyArr])

  const noData = (!dataArr || dataArr.length === 0);

  return (
    <><h4 className='tx-shade4'>共 {dataArr.length} 件商品</h4>
      <table className={s.cartTable}>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th style={{ width: '200px' }}></th>
            <th>商品資訊</th>
            <th>規格</th>
            <th style={{ width: '9rem' }}>單價</th>
            <th>數量</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData ? <></> :
            dataArr.map((item, i_data) => (
              <tr key={item.key}>
                <td>
                  <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                    <RxCross2 />
                  </FddBtn>
                </td>
                <td>
                  <Image
                    src={'/pic-prod/' + item.pic_path}
                    width={192}
                    height={192}
                    alt={item.name}
                  />
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
                <td>${totArr[i_data]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {noData ? <h2 className='tx-shade4'>購物車現在空無一物</h2>
        : <></>}
    </>
  )
}
